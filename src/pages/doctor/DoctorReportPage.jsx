import { useMemo } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';
import { useCare } from '../../context/CareContext.jsx';
import { getDemoPatient } from '../../data/demoUsers.js';

function formatDateLabel(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
}

function toDateValue(dateString) {
  const time = new Date(dateString);
  return Number.isNaN(time.getTime()) ? new Date(0) : time;
}

export default function DoctorReportPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { events, appointments } = useCare();

  const patient = getDemoPatient(patientId);
  const rangeDays = Number(new URLSearchParams(location.search).get('range')) || 14;

  const patientEvents = useMemo(() => {
    if (!patient) return [];
    return events.filter((event) => event.patientId === patient.id);
  }, [events, patient]);

  const filteredEvents = useMemo(() => {
    const rangeStart = new Date();
    rangeStart.setDate(rangeStart.getDate() - rangeDays);

    return [...patientEvents]
      .filter((event) => !event.date || toDateValue(event.date) >= rangeStart)
      .sort((a, b) => toDateValue(b.date) - toDateValue(a.date));
  }, [patientEvents, rangeDays]);

  const completedDoses = filteredEvents.filter((event) => event.type === 'medication_taken').length;
  const missedDoses = filteredEvents.filter((event) => event.type === 'medication_missed').length;
  const adherencePct = completedDoses + missedDoses === 0 ? 0 : Math.round((completedDoses / (completedDoses + missedDoses)) * 100);
  const appointmentHistory = appointments.filter((appointment) => appointment.patientId === patientId);
  const symptomEvents = filteredEvents.filter((event) => event.type === 'symptom_reported');
  const escalatedEntries = filteredEvents.filter(
    (event) => event.type === 'help_requested' || (event.type === 'symptom_reported' && event.severity >= 7)
  );
  const patientNotes = filteredEvents.filter((event) => event.note && event.note.trim().length > 0);

  const chartData = symptomEvents.map((event) => ({
    date: formatDateLabel(event.date),
    severity: Number(event.severity || 0),
    symptom: event.symptom,
  }));

  if (!patient) {
    return (
      <EmptyState
        title="Unknown Demo Patient"
        body="This patient is not in the shared mock data set."
        action={
          <Button variant="primary" size="sm" onClick={() => navigate('/doctor')}>
            Back to roster
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6 print-report">
      <PageHeader
        title="Patient Progress Report"
        subtitle={`Patient ID: ${patient.id} · Reporting period: last ${rangeDays} days`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => navigate(`/doctor/patients/${patient.id}?range=${rangeDays}`)}>
              Back to detail
            </Button>
            <Button variant="primary" size="sm" onClick={() => window.print()}>
              Print Report
            </Button>
          </div>
        }
      />

      <Card className="p-4">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Reporting period</p>
            <p className="text-h3 font-bold text-ink">Last {rangeDays} days</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[7, 14, 30].map((option) => (
              <Link
                key={option}
                to={`/doctor/patients/${patient.id}/report?range=${option}`}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  rangeDays === option
                    ? 'border-primary bg-primary text-white'
                    : 'border-borderTheme bg-card text-muted hover:border-primary/35 hover:text-ink'
                }`}
              >
                {option}-day report
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-card border border-borderTheme bg-canvas p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Patient</p>
            <p className="mt-2 text-small font-semibold text-ink">{patient.displayName}</p>
            <p className="text-xs text-muted">{patient.id}</p>
          </div>
          <div className="rounded-card border border-borderTheme bg-canvas p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Adherence</p>
            <p className="mt-2 text-small font-semibold text-ink">{adherencePct}%</p>
          </div>
          <div className="rounded-card border border-borderTheme bg-canvas p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Completed doses</p>
            <p className="mt-2 text-small font-semibold text-ink">{completedDoses}</p>
          </div>
          <div className="rounded-card border border-borderTheme bg-canvas p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Missed doses</p>
            <p className="mt-2 text-small font-semibold text-ink">{missedDoses}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="p-4">
          <h2 className="text-h3 font-bold text-ink">Symptom trend</h2>
          {chartData.length > 0 ? (
            <div className="mt-4 h-64 w-full">
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
            <EmptyState title="No symptom data" body="No patient-reported symptom entries are available for this range." />
          )}
        </Card>

        <Card className="p-4">
          <h2 className="text-h3 font-bold text-ink">Observed activity summary</h2>
          <ul className="mt-4 space-y-2 text-small text-muted leading-relaxed">
            <li>• {completedDoses} completed medication doses</li>
            <li>• {missedDoses} missed medication doses</li>
            <li>• {symptomEvents.length} patient-reported symptom entries</li>
            <li>• {escalatedEntries.length} escalated or high-severity entries</li>
            <li>• {patientNotes.length} patient notes captured</li>
          </ul>
          <div className="mt-4 rounded-card border border-borderTheme bg-canvas p-3 text-xs leading-relaxed text-muted">
            This report compiles patient-reported logs for review. It does not contain automated diagnoses or treatment plans.
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="text-h3 font-bold text-ink">Appointment history</h2>
        <div className="mt-4 space-y-3">
          {appointmentHistory.length > 0 ? (
            appointmentHistory.map((appointment) => (
              <div key={appointment.id} className="rounded-card border border-borderTheme bg-canvas p-3 text-small">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-ink">{appointment.title}</p>
                  <Badge tone={appointment.status === 'missed' ? 'missed' : 'stable'}>{appointment.status}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted">{appointment.scheduledDate} · {appointment.scheduledTime}</p>
                <p className="text-xs text-muted">{appointment.location}</p>
              </div>
            ))
          ) : (
            <EmptyState title="No appointment records" body="No appointments are linked to this patient for the selected period." />
          )}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-4">
          <h2 className="text-h3 font-bold text-ink">Escalated symptom entries</h2>
          <div className="mt-4 space-y-3">
            {escalatedEntries.length > 0 ? (
              escalatedEntries.map((event) => (
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
              <EmptyState title="No escalations" body="No escalated symptom entries were logged in this range." />
            )}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-h3 font-bold text-ink">Original patient notes</h2>
          <div className="mt-4 space-y-3">
            {patientNotes.length > 0 ? (
              patientNotes.map((event) => (
                <div key={event.id} className="rounded-card border border-borderTheme bg-canvas p-3 text-small text-muted">
                  <p className="font-semibold text-ink">{event.title}</p>
                  <p className="mt-1">{event.note}</p>
                  <p className="mt-2 text-[11px] text-muted">{event.date} · {event.time}</p>
                </div>
              ))
            ) : (
              <EmptyState title="No patient notes" body="No original patient notes were recorded in the selected date range." />
            )}
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="text-h3 font-bold text-ink">Exact chronological activity timeline</h2>
        <div className="mt-4 space-y-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="rounded-card border border-borderTheme bg-canvas p-3">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">{event.type}</p>
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
            <EmptyState title="No timeline entries" body="No activity exists for this report period." />
          )}
        </div>
      </Card>
    </div>
  );
}

