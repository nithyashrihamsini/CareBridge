import { useMemo } from 'react';
import AppointmentCard from '../../components/patient/AppointmentCard.jsx';
import CareStatusCard from '../../components/patient/CareStatusCard.jsx';
import DailyFeelingCard from '../../components/patient/DailyFeelingCard.jsx';
import MedicationTaskCard from '../../components/patient/MedicationTaskCard.jsx';
import SymptomEntryBanner from '../../components/patient/SymptomEntryBanner.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';
import { useCare } from '../../context/CareContext.jsx';

export default function PatientHomePage() {
  const {
    patient,
    medications,
    appointments,
    dailyFeeling,
    events,
    markMedication,
    updateAppointment,
    recordDailyFeeling,
    resetDemoData,
  } = useCare();

  // Dynamic greeting based on time
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Formatted date
  const formattedDate = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  // Filter today's events for quick display
  const todayDateString = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, []);

  const todayEvents = useMemo(() => {
    return events.filter((e) => e.date === todayDateString);
  }, [events, todayDateString]);

  const upcomingAppointment = appointments[0] || null;

  return (
    <div className="space-y-6">
      {/* 1. Greeting & Current Date */}
      <div>
        <PageHeader
          title={`${greeting}, ${patient.displayName.split(' ')[0]} 👋`}
          subtitle={`Today is ${formattedDate}`}
          actions={
            <button
              type="button"
              onClick={resetDemoData}
              title="Reset tasks to initial demo state"
              className="text-xs text-muted hover:text-primary transition-colors underline"
            >
              Reset Demo Tasks
            </button>
          }
        />
      </div>

      {/* 2. Today's Care Plan Status */}
      <CareStatusCard medications={medications} dailyFeeling={dailyFeeling} />

      {/* 3. Today's Scheduled Medications */}
      <section aria-labelledby="medications-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="medications-heading" className="text-h3 font-bold text-ink">
              Today's Care Tasks
            </h2>
            <p className="text-xs text-muted">Mark each scheduled medication as taken or missed</p>
          </div>
          <Badge tone="default">Prescribed Plan</Badge>
        </div>

        <div className="space-y-3">
          {medications.map((med) => (
            <MedicationTaskCard
              key={med.id}
              medication={med}
              onMarkTaken={(id, note) => markMedication(id, 'taken', note)}
              onMarkMissed={(id, note) => markMedication(id, 'missed', note)}
            />
          ))}
        </div>
      </section>

      {/* 4. Daily Feeling Check-in */}
      <section aria-labelledby="feelings-heading">
        <DailyFeelingCard
          currentFeeling={dailyFeeling}
          onRecordFeeling={recordDailyFeeling}
        />
      </section>

      {/* 5. Symptom Entry Point */}
      <section aria-labelledby="symptoms-entry">
        <SymptomEntryBanner />
      </section>

      {/* 6. Upcoming Appointment Card */}
      {upcomingAppointment && (
        <section aria-labelledby="appointment-heading">
          <AppointmentCard
            appointment={upcomingAppointment}
            onUpdateStatus={updateAppointment}
          />
        </section>
      )}

      {/* 7. Today's Chronological Activity Trail */}
      <section aria-labelledby="activity-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="activity-heading" className="text-h3 font-bold text-ink">
            Today's Logged Activity
          </h2>
          <Badge tone="patient-reported">
            {todayEvents.length} {todayEvents.length === 1 ? 'Event' : 'Events'}
          </Badge>
        </div>

        {todayEvents.length === 0 ? (
          <Card className="text-center p-6 bg-canvas border border-dashed border-borderTheme">
            <p className="text-small text-muted">No activities logged yet today.</p>
            <p className="text-xs text-muted mt-1">
              Mark a medication as taken or missed above to begin today's record.
            </p>
          </Card>
        ) : (
          <div className="space-y-2.5">
            {todayEvents.map((evt) => {
              const isTaken = evt.status === 'taken';
              const isMissed = evt.status === 'missed';
              const isAttended = evt.status === 'attended' || evt.status === 'confirmed';
              const isSymptomEvent = evt.type === 'symptom_reported';
              const isHelpEvent = evt.type === 'help_requested';

              return (
                <Card key={evt.id} className="p-3.5 bg-card border border-borderTheme">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted bg-canvas px-2 py-0.5 rounded border border-borderTheme">
                        {evt.time}
                      </span>
                      <p className="text-small font-semibold text-ink">{evt.title}</p>
                    </div>

                    <div>
                      {isTaken && <Badge tone="stable">Taken</Badge>}
                      {isMissed && <Badge tone="missed">Missed</Badge>}
                      {isAttended && <Badge tone="stable">Confirmed</Badge>}
                      {!isTaken && !isMissed && !isAttended && (
                        <Badge tone="default">{evt.status}</Badge>
                      )}
                    </div>
                  </div>

                  {(isSymptomEvent || isHelpEvent) && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge tone="patient-reported">Patient-Reported</Badge>
                      {evt.interfaceFlag && (
                        <Badge tone={evt.interfaceFlag === 'Requires Professional Review' ? 'review' : evt.interfaceFlag === 'Attention' ? 'default' : 'stable'}>
                          {evt.interfaceFlag}
                        </Badge>
                      )}
                    </div>
                  )}

                  {(isSymptomEvent || isHelpEvent) && (
                    <div className="mt-2 space-y-1 text-xs text-muted">
                      {evt.symptom && <p><span className="font-semibold text-ink">Symptom:</span> {evt.symptom}</p>}
                      {evt.severity != null && <p><span className="font-semibold text-ink">Severity:</span> {evt.severity}/10</p>}
                      {evt.duration && <p><span className="font-semibold text-ink">Duration:</span> {evt.duration}</p>}
                      {evt.comparison && <p><span className="font-semibold text-ink">Comparison:</span> {evt.comparison}</p>}
                      {evt.requestHelp && <p><span className="font-semibold text-ink">Support request:</span> Help requested</p>}
                    </div>
                  )}

                  {evt.note && (
                    <div className="mt-2 text-xs text-muted bg-canvas p-2 rounded border border-borderTheme">
                      <span className="font-semibold text-ink">Note: </span>
                      <span className="italic">"{evt.note}"</span>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}


