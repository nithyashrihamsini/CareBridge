import { useMemo, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';
import { useCare } from '../../context/CareContext.jsx';
import { getDemoPatient } from '../../data/demoUsers.js';

const RANGE_OPTIONS = [7, 14, 30];

function toDateValue(dateString) {
  const time = new Date(dateString);
  return Number.isNaN(time.getTime()) ? new Date(0) : time;
}

function formatDateLabel(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
}

export default function DoctorPatientPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { events, appointments } = useCare();
  const [rangeDays, setRangeDays] = useState(14);

  const patient = getDemoPatient(patientId);

  const patientEvents = useMemo(() => {
    if (!patient) return [];
    return events.filter((event) => event.patientId === patient.id);
  }, [events, patient]);

  const filteredEvents = useMemo(() => {
    const rangeStart = new Date();
    rangeStart.setDate(rangeStart.getDate() - rangeDays);

    return [...patientEvents]
      .filter((event) => {
        if (!event.date) return true;
        return toDateValue(event.date) >= rangeStart;
      })
      .sort((a, b) => toDateValue(b.date) - toDateValue(a.date));
  }, [patientEvents, rangeDays]);

  const symptomEvents = useMemo(
    () => filteredEvents.filter((event) => event.type === 'symptom_reported'),
    [filteredEvents]
  );

  const helpRequests = useMemo(
    () => filteredEvents.filter((event) => event.type === 'help_requested'),
    [filteredEvents]
  );

  const missedDoses = useMemo(
    () => filteredEvents.filter((event) => event.type === 'medication_missed').length,
    [filteredEvents]
  );

  const completedDoses = useMemo(
    () => filteredEvents.filter((event) => event.type === 'medication_taken').length,
    [filteredEvents]
  );

  const adherencePct = useMemo(() => {
    const totalDoses = completedDoses + missedDoses;
    if (!totalDoses) return 0;
    return Math.round((completedDoses / totalDoses) * 100);
  }, [completedDoses, missedDoses]);

  const statusLabel = useMemo(() => {
    const severeSymptom = symptomEvents.some(
      (event) => event.severity >= 7 || (event.severity >= 4 && event.comparison === 'Worse than usual')
    );
    if (severeSymptom || helpRequests.length > 0) return 'Requires professional review';
    if (missedDoses > 0) return 'Attention';
    if (symptomEvents.length > 0) return 'Stable';
    return 'Awaiting review';
  }, [helpRequests.length, missedDoses, symptomEvents]);

  const chartData = useMemo(
    () =>
      symptomEvents.map((event) => ({
        date: formatDateLabel(event.date),
        severity: Number(event.severity || 0),
        symptom: event.symptom,
      })),
    [symptomEvents]
  );

  const patientAppointments = useMemo(
    () => appointments.filter((appointment) => appointment.patientId === patientId),
    [appointments, patientId]
  );

  if (!patient) {
    return (
      <EmptyState
        title="Unknown Demo Patient"
        body="This ID is not in the synthetic mock registry."
        action={
          <Button variant="primary" size="sm" onClick={() => navigate('/doctor')}>
            Return to Roster
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={patient.displayName}
        subtitle={`Patient ID: ${patient.id} · Displaying data from the shared activity log.`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              tone={
                statusLabel === 'Requires professional review'
                  ? 'review'
                  : statusLabel === 'Attention'
                    ? 'default'
                    : 'stable'
              }
            >
              {statusLabel}
            </Badge>
            <Button variant="tertiary" size="sm" onClick={() => navigate(`/doctor/patients/${patient.id}/report?range=${rangeDays}`)}>
              Generate Progress Report
            </Button>
          </div>
        }
      />

      <Card className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-small font-semibold text-ink">Date range</p>
            <p className="text-xs text-muted">Review the patient activity within the selected period.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setRangeDays(option)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  rangeDays === option
                    ? 'border-primary bg-primary text-white'
                    : 'border-borderTheme bg-card text-muted hover:border-primary/35 hover:text-ink'
                }`}
              >
                Last {option} days
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Adherence</p>
          <p className="mt-2 text-3xl font-bold text-ink">{adherencePct}%</p>
          <p className="mt-1 text-small text-muted">Completed doses vs missed doses</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Completed doses</p>
          <p className="mt-2 text-3xl font-bold text-ink">{completedDoses}</p>
          <p className="mt-1 text-small text-muted">Logged medication completion events</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Missed doses</p>
          <p className="mt-2 text-3xl font-bold text-ink">{missedDoses}</p>
          <p className="mt-1 text-small text-muted">Medication events marked missed</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Escalations</p>
          <p className="mt-2 text-3xl font-bold text-ink">{helpRequests.length}</p>
          <p className="mt-1 text-small text-muted">Help requests recorded by patient</p>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-h3 font-bold text-ink">Symptom trend</h2>
            <Badge tone="patient-reported">Patient-Reported</Badge>
          </div>
          {chartData.length > 0 ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 10]} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="severity" stroke="#4A90E2" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState title="No symptom trend data" body="No patient-reported symptom entries were logged for this date range." />
          )}
        </Card>

        <Card className="p-4">
          <h2 className="text-h3 font-bold text-ink">Medication activity</h2>
          <div className="mt-4 space-y-2.5">
            {filteredEvents.filter((event) => event.type === 'medication_taken' || event.type === 'medication_missed').length > 0 ? (
              filteredEvents
                .filter((event) => event.type === 'medication_taken' || event.type === 'medication_missed')
                .slice(0, 8)
                .map((event) => (
                  <div key={event.id} className="rounded-card border border-borderTheme bg-canvas p-3 text-small leading-relaxed">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-ink">{event.title}</span>
                      <Badge tone={event.type === 'medication_taken' ? 'stable' : 'missed'}>
                        {event.type === 'medication_taken' ? 'Taken' : 'Missed'}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted">{event.date} · {event.time}</p>
                  </div>
                ))
            ) : (
              <EmptyState title="No medication activity" body="No medication events for this date range." />
            )}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-4">
          <h2 className="text-h3 font-bold text-ink">Appointment history</h2>
          <div className="mt-4 space-y-3">
            {patientAppointments.length > 0 ? (
              patientAppointments.map((appointment) => (
                <div key={appointment.id} className="rounded-card border border-borderTheme bg-canvas p-3 text-small">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-ink">{appointment.title}</p>
                    <Badge tone={appointment.status === 'missed' ? 'missed' : 'stable'}>{appointment.status}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted">{appointment.scheduledDate} · {appointment.scheduledTime}</p>
                  <p className="mt-1 text-xs text-muted">{appointment.location}</p>
                </div>
              ))
            ) : (
              <EmptyState title="No appointment history" body="No appointment records are available for this patient." />
            )}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-h3 font-bold text-ink">Escalation history</h2>
          <div className="mt-4 space-y-3">
            {helpRequests.length > 0 ? (
              helpRequests.map((event) => (
                <div key={event.id} className="rounded-card border border-borderTheme bg-canvas p-3 text-small">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-ink">{event.title}</p>
                    <Badge tone="review">Requires professional review</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted">{event.date} · {event.time}</p>
                  <p className="mt-1 text-xs text-muted">{event.note}</p>
                </div>
              ))
            ) : (
              <EmptyState title="No escalations" body="No help requests were logged in the selected date range." />
            )}
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="text-h3 font-bold text-ink">Exact chronological activity timeline</h2>
        <div className="mt-4 space-y-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="rounded-card border border-borderTheme bg-canvas p-3 leading-relaxed">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted">{event.type}</p>
                    <p className="text-small font-semibold text-ink">{event.title}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={event.status === 'Requires professional review' ? 'review' : event.status === 'Attention' ? 'default' : 'stable'}>
                      {event.status || 'recorded'}
                    </Badge>
                    <Badge tone="patient-reported">{event.source || 'patient'}</Badge>
                  </div>
                </div>
                <div className="mt-3 grid gap-2 text-xs text-muted md:grid-cols-2">
                  <p><span className="font-semibold text-ink">Date:</span> {event.date}</p>
                  <p><span className="font-semibold text-ink">Time:</span> {event.time}</p>
                  <p><span className="font-semibold text-ink">Activity type:</span> {event.type}</p>
                  <p><span className="font-semibold text-ink">Title:</span> {event.title}</p>
                  <p><span className="font-semibold text-ink">Status:</span> {event.status || 'recorded'}</p>
                  <p><span className="font-semibold text-ink">Source:</span> {event.source || 'patient'}</p>
                </div>
                {event.note && (
                  <div className="mt-3 rounded-card border border-borderTheme bg-card p-2 text-xs text-muted">
                    <span className="font-semibold text-ink">Original note:</span> {event.note}
                  </div>
                )}
              </div>
            ))
          ) : (
            <EmptyState title="No activity in this range" body="There are no shared activity events for the selected time period." />
          )}
        </div>
      </Card>
    </div>
  );
}

