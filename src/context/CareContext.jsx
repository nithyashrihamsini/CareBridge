import { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_ACTIVITY_EVENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_MEDICATIONS,
  INITIAL_PATIENT,
} from '../data/mockCareData.js';

const CareContext = createContext(null);

const STORAGE_KEY = 'carebridge_state_v1';

export function getInterfaceFlag(severity, trend = 'Same as usual') {
  const numSeverity = Number(severity) || 0;
  const normalizedTrend = trend || 'Same as usual';

  if (numSeverity >= 7 || (numSeverity >= 4 && normalizedTrend === 'Worse than usual')) {
    return 'Requires Professional Review';
  }

  if (numSeverity >= 4) {
    return 'Attention';
  }

  return 'Stable';
}

function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getCurrentTimeString() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function CareProvider({ children }) {
  const [patient] = useState(INITIAL_PATIENT);

  const [medications, setMedications] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_meds`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading meds from storage', e);
    }
    return INITIAL_MEDICATIONS;
  });

  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_apts`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading apts from storage', e);
    }
    return INITIAL_APPOINTMENTS;
  });

  const [dailyFeeling, setDailyFeeling] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_feeling`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading feeling from storage', e);
    }
    return null;
  });

  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_events`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading events from storage', e);
    }
    return INITIAL_ACTIVITY_EVENTS;
  });

  const [toast, setToast] = useState(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_meds`, JSON.stringify(medications));
    } catch {}
  }, [medications]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_apts`, JSON.stringify(appointments));
    } catch {}
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_feeling`, JSON.stringify(dailyFeeling));
    } catch {}
  }, [dailyFeeling]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(events));
    } catch {}
  }, [events]);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  const clearToast = () => setToast(null);

  /**
   * Mark Medication as Taken or Missed
   * Creates an Activity Event conforming to shared schema.
   */
  const markMedication = (medId, status, note = '') => {
    const med = medications.find((m) => m.id === medId);
    if (!med) return;

    const actionTime = getCurrentTimeString();
    const actionDate = getTodayDateString();

    // 1. Update medication state
    setMedications((prev) =>
      prev.map((item) =>
        item.id === medId
          ? { ...item, status, actionTime, note: note.trim() }
          : item
      )
    );

    // 2. Construct Shared Activity Event
    const newEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      patientId: patient.id,
      type: status === 'taken' ? 'medication_taken' : 'medication_missed',
      title: med.name,
      status: status,
      date: actionDate,
      time: actionTime,
      source: 'patient',
      note: note.trim(),
    };

    // 3. Append to event store
    setEvents((prev) => [newEvent, ...prev]);

    // 4. Feedback
    if (status === 'taken') {
      showToast(`✓ Marked ${med.name} as taken at ${actionTime}`);
    } else {
      showToast(`Recorded ${med.name} as missed`, 'attention');
    }

    return newEvent;
  };

  /**
   * Update Appointment (e.g. Attended, Rescheduled, Confirmed)
   */
  const updateAppointment = (aptId, newStatus, note = '') => {
    const apt = appointments.find((a) => a.id === aptId);
    if (!apt) return;

    const actionTime = getCurrentTimeString();
    const actionDate = getTodayDateString();

    // 1. Update appointment state
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === aptId ? { ...item, status: newStatus } : item
      )
    );

    // 2. Construct Shared Activity Event
    const newEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      patientId: patient.id,
      type: 'appointment_updated',
      title: `${apt.title} (${apt.doctorName})`,
      status: newStatus,
      date: actionDate,
      time: actionTime,
      source: 'patient',
      note: note.trim(),
    };

    // 3. Append to event store
    setEvents((prev) => [newEvent, ...prev]);

    // 4. Feedback
    showToast(`Appointment status updated to ${newStatus}`);

    return newEvent;
  };

  /**
   * Record Daily Feeling Check-in
   */
  const recordDailyFeeling = (feeling, note = '') => {
    const actionTime = getCurrentTimeString();
    const actionDate = getTodayDateString();

    const checkInData = {
      feeling,
      note: note.trim(),
      time: actionTime,
      date: actionDate,
    };

    setDailyFeeling(checkInData);

    // Construct Shared Activity Event
    const newEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      patientId: patient.id,
      type: 'feeling_recorded',
      title: 'Daily Feeling Check-in',
      status: 'recorded',
      date: actionDate,
      time: actionTime,
      source: 'patient',
      note: note.trim() ? `${feeling} — ${note.trim()}` : feeling,
    };

    setEvents((prev) => [newEvent, ...prev]);
    showToast(`Daily feeling recorded: ${feeling}`);

    return newEvent;
  };

  /**
   * Log Symptom Check-in
   * Transparent Interface Flags:
   * - 0–3: Stable
   * - 4–6: Attention
   * - 7–10 or high severity plus worse than usual: Requires professional review
   * Labels every entry as Patient-Reported.
   */
  const logSymptom = ({ symptom, severity, duration, trend, note = '', requestHelp = false }) => {
    const actionTime = getCurrentTimeString();
    const actionDate = getTodayDateString();

    const numSeverity = Number(severity) || 0;
    const normalizedTrend = trend || 'Same as usual';
    const flag = getInterfaceFlag(numSeverity, normalizedTrend);

    const detailsParts = [
      `Severity: ${numSeverity}/10`,
      duration ? `Duration: ${duration}` : null,
      trend ? `Comparison: ${trend}` : null,
      note?.trim() ? `Note: "${note.trim()}"` : null,
    ].filter(Boolean);

    const symptomEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      patientId: patient.id,
      type: 'symptom_reported',
      title: `${symptom} (${numSeverity}/10 · ${flag})`,
      status: flag,
      date: actionDate,
      time: actionTime,
      source: 'patient',
      note: detailsParts.join(' · '),
      severity: numSeverity,
      symptom,
      duration,
      comparison: normalizedTrend,
      interfaceFlag: flag,
      patientReported: true,
      requestHelp,
    };

    const newEventsToAdd = [symptomEvent];

    if (requestHelp) {
      const helpEvent = {
        id: `evt_${Date.now() + 1}_${Math.random().toString(36).substring(2, 6)}_help`,
        patientId: patient.id,
        type: 'help_requested',
        title: `Help Requested: ${symptom} (Severity ${numSeverity}/10)`,
        status: 'Requires Professional Review',
        date: actionDate,
        time: actionTime,
        source: 'patient',
        note: note?.trim()
          ? `Patient requested help. Symptom: ${symptom}. Severity: ${numSeverity}/10. Duration: ${duration}. Comparison: ${normalizedTrend}. Patient note: "${note.trim()}".`
          : `Patient requested help. Symptom: ${symptom}. Severity: ${numSeverity}/10. Duration: ${duration}. Comparison: ${normalizedTrend}.`,
        severity: numSeverity,
        symptom,
        duration,
        comparison: normalizedTrend,
        interfaceFlag: flag,
        patientReported: true,
        requestHelp: true,
      };
      newEventsToAdd.unshift(helpEvent);
    }

    setEvents((prev) => [...newEventsToAdd, ...prev]);

    if (requestHelp) {
      showToast('✓ Help request recorded', 'attention');
    } else {
      showToast(`✓ Patient-Reported symptom recorded (${flag})`);
    }

    return { symptomEvent, flag };
  };

  /**
   * Generic event creator
   */
  const addActivityEvent = (eventData) => {
    const newEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      patientId: patient.id,
      date: getTodayDateString(),
      time: getCurrentTimeString(),
      source: 'patient',
      note: '',
      ...eventData,
    };
    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };


  /**
   * Reset Demo State
   */
  const resetDemoData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_meds`);
    localStorage.removeItem(`${STORAGE_KEY}_apts`);
    localStorage.removeItem(`${STORAGE_KEY}_feeling`);
    localStorage.removeItem(`${STORAGE_KEY}_events`);

    setMedications(INITIAL_MEDICATIONS);
    setAppointments(INITIAL_APPOINTMENTS);
    setDailyFeeling(null);
    setEvents(INITIAL_ACTIVITY_EVENTS);

    showToast('Reset to initial demonstration state');
  };

  return (
    <CareContext.Provider
      value={{
        patient,
        medications,
        appointments,
        dailyFeeling,
        events,
        toast,
        showToast,
        clearToast,
        markMedication,
        updateAppointment,
        recordDailyFeeling,
        addActivityEvent,
        logSymptom,
        resetDemoData,
      }}
    >
      {children}
    </CareContext.Provider>
  );
}

export function useCare() {
  const context = useContext(CareContext);
  if (!context) {
    throw new Error('useCare must be used within a CareProvider');
  }
  return context;
}
