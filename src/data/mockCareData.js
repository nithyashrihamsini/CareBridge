/**
 * Synthetic Care Data for CareBridge AI.
 * Strictly fictitious demo profiles and records — no real patient data.
 */

export const INITIAL_PATIENT = {
  id: 'pat_alex',
  displayName: 'Alex Rivera',
  age: 48,
  condition: 'Type 2 Diabetes & Mild Hypertension',
  assignedDoctor: 'Dr. Priya Shah',
  doctorId: 'doc_demo_1',
  carePlanStartDate: '2026-08-01',
};

export const INITIAL_MEDICATIONS = [
  {
    id: 'med_metformin',
    name: 'Metformin 500mg',
    form: 'Oral Tablet',
    dosage: '1 tablet (500mg)',
    scheduleTime: '08:00 AM',
    timeSlot: 'Morning',
    instructions: 'Take with breakfast to minimize stomach upset.',
    status: 'pending', // 'pending' | 'taken' | 'missed'
    actionTime: null,
    note: '',
  },
  {
    id: 'med_lisinopril',
    name: 'Lisinopril 10mg',
    form: 'Oral Tablet',
    dosage: '1 tablet (10mg)',
    scheduleTime: '08:30 AM',
    timeSlot: 'Morning',
    instructions: 'Take once daily in the morning with water.',
    status: 'pending',
    actionTime: null,
    note: '',
  },
  {
    id: 'med_atorvastatin',
    name: 'Atorvastatin 20mg',
    form: 'Oral Tablet',
    dosage: '1 tablet (20mg)',
    scheduleTime: '08:00 PM',
    timeSlot: 'Evening',
    instructions: 'Take once daily with evening meal or at bedtime.',
    status: 'pending',
    actionTime: null,
    note: '',
  },
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'apt_followup',
    patientId: 'pat_alex',
    doctorName: 'Dr. Priya Shah',
    specialty: 'Metabolic & Chronic Care Clinic',
    title: 'Routine Care-Plan Review & Lab Check',
    scheduledDate: '2026-09-23',
    scheduledTime: '10:30 AM',
    location: 'Suite 304, Ambulatory Health Center',
    status: 'scheduled', // 'scheduled' | 'attended' | 'rescheduled' | 'missed'
    notes: 'Bring current home glucose log and questions about evening doses.',
  },
];

/**
 * Historical seed events following the exact shared activity schema:
 * { id, patientId, type, title, status, date, time, source, note }
 */
export const INITIAL_ACTIVITY_EVENTS = [
  {
    id: 'evt_hist_01',
    patientId: 'pat_alex',
    type: 'medication_taken',
    title: 'Metformin 500mg',
    status: 'taken',
    date: '2026-09-18',
    time: '08:15 AM',
    source: 'patient',
    note: 'Taken with breakfast',
  },
  {
    id: 'evt_hist_02',
    patientId: 'pat_alex',
    type: 'medication_taken',
    title: 'Lisinopril 10mg',
    status: 'taken',
    date: '2026-09-18',
    time: '08:20 AM',
    source: 'patient',
    note: '',
  },
  {
    id: 'evt_hist_03',
    patientId: 'pat_alex',
    type: 'feeling_recorded',
    title: 'Daily Feeling Check-in',
    status: 'recorded',
    date: '2026-09-18',
    time: '07:30 PM',
    source: 'patient',
    note: 'Good — Energy felt steady throughout the workday.',
  },
  {
    id: 'evt_hist_04',
    patientId: 'pat_alex',
    type: 'medication_taken',
    title: 'Atorvastatin 20mg',
    status: 'taken',
    date: '2026-09-18',
    time: '08:10 PM',
    source: 'patient',
    note: '',
  },
  {
    id: 'evt_hist_05',
    patientId: 'pat_alex',
    type: 'medication_taken',
    title: 'Metformin 500mg',
    status: 'taken',
    date: '2026-09-19',
    time: '08:30 AM',
    source: 'patient',
    note: 'Taken after breakfast.',
  },
  {
    id: 'evt_hist_06',
    patientId: 'pat_alex',
    type: 'medication_missed',
    title: 'Lisinopril 10mg',
    status: 'missed',
    date: '2026-09-19',
    time: '09:45 AM',
    source: 'patient',
    note: 'Felt slight dizziness in the morning so held dose.',
  },
  {
    id: 'evt_hist_07',
    patientId: 'pat_alex',
    type: 'feeling_recorded',
    title: 'Daily Feeling Check-in',
    status: 'recorded',
    date: '2026-09-19',
    time: '06:00 PM',
    source: 'patient',
    note: 'Fatigued — Needed an afternoon rest.',
  },
  {
    id: 'evt_hist_08',
    patientId: 'pat_alex',
    type: 'medication_taken',
    title: 'Atorvastatin 20mg',
    status: 'taken',
    date: '2026-09-19',
    time: '08:15 PM',
    source: 'patient',
    note: '',
  },
];
