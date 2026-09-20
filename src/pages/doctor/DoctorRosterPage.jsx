import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';
import { useCare } from '../../context/CareContext.jsx';
import { demoPatients } from '../../data/demoUsers.js';

const FILTERS = [
  'All',
  'Requires professional review',
  'Missed doses',
  'Missed appointments',
  'Symptom escalation',
];

function getStatusLabel(patientEvents, missedDoses, missedAppointments) {
  const symptomEscalations = patientEvents.filter((event) => {
    if (event.type !== 'symptom_reported') return false;
    return event.severity >= 7 || (event.severity >= 4 && event.comparison === 'Worse than usual');
  }).length;

  const escalations = patientEvents.filter((event) => event.type === 'help_requested').length;

  if (symptomEscalations > 0 || escalations > 0) {
    return 'Requires professional review';
  }

  if (missedDoses > 0 || missedAppointments > 0) {
    return 'Attention';
  }

  if (patientEvents.length > 0) {
    return 'Stable';
  }

  return 'Awaiting review';
}

export default function DoctorRosterPage() {
  const { events, appointments } = useCare();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const patientSummaries = useMemo(() => {
    return demoPatients.map((patient) => {
      const patientEvents = events.filter((event) => event.patientId === patient.id);
      const missedDoses = patientEvents.filter((event) => event.type === 'medication_missed').length;
      const missedAppointments = appointments.filter(
        (appointment) => appointment.patientId === patient.id && appointment.status === 'missed'
      ).length;
      const symptomEscalations = patientEvents.filter((event) => {
        if (event.type !== 'symptom_reported') return false;
        return event.severity >= 7 || (event.severity >= 4 && event.comparison === 'Worse than usual');
      }).length;
      const escalations = patientEvents.filter((event) => event.type === 'help_requested').length;
      const totalEvents = patientEvents.length;
      const status = getStatusLabel(patientEvents, missedDoses, missedAppointments);

      return {
        ...patient,
        status,
        totalEvents,
        missedDoses,
        missedAppointments,
        symptomEscalations,
        escalations,
      };
    });
  }, [appointments, events]);

  const visiblePatients = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return patientSummaries.filter((patient) => {
      const matchesSearch =
        !query ||
        patient.displayName.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query);

      const matchesFilter = (() => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Requires professional review') return patient.status === 'Requires professional review';
        if (activeFilter === 'Missed doses') return patient.missedDoses > 0;
        if (activeFilter === 'Missed appointments') return patient.missedAppointments > 0;
        if (activeFilter === 'Symptom escalation') return patient.symptomEscalations > 0 || patient.escalations > 0;
        return true;
      })();

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, patientSummaries, searchTerm]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assigned Patient Roster"
        subtitle="Monitor patient status, review counts, and filter by missed doses, appointments, or symptom escalation."
        actions={<Badge tone="default">Shared Activity Data</Badge>}
      />

      <Card className="p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <label htmlFor="patient-search" className="mb-2 block text-small font-semibold text-ink">
              Search by patient name or ID
            </label>
            <input
              id="patient-search"
              type="text"
              value={searchTerm}
              aria-label="Search patient roster by name or ID"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search patient roster"
              className="w-full rounded-card border border-borderTheme bg-card px-3 py-2.5 text-small text-ink placeholder:text-muted focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeFilter === filter
                    ? 'border-primary bg-primary text-white'
                    : 'border-borderTheme bg-card text-muted hover:border-primary/35 hover:text-ink'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {patientSummaries.map((patient) => (
          <Card key={patient.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-small">
                  {patient.displayName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-ink">{patient.displayName}</p>
                  <p className="text-[11px] text-muted">ID: {patient.id}</p>
                </div>
              </div>
              <Badge
                tone={
                  patient.status === 'Requires professional review'
                    ? 'review'
                    : patient.status === 'Attention'
                      ? 'default'
                      : patient.status === 'Stable'
                        ? 'stable'
                        : 'default'
                }
              >
                {patient.status}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs text-muted">
              <div className="rounded-card bg-canvas p-2">
                <p className="font-semibold text-ink">{patient.missedDoses}</p>
                <p>Missed doses</p>
              </div>
              <div className="rounded-card bg-canvas p-2">
                <p className="font-semibold text-ink">{patient.missedAppointments}</p>
                <p>Missed visits</p>
              </div>
              <div className="rounded-card bg-canvas p-2">
                <p className="font-semibold text-ink">{patient.escalations}</p>
                <p>Escalation</p>
              </div>
              <div className="rounded-card bg-canvas p-2">
                <p className="font-semibold text-ink">{patient.totalEvents}</p>
                <p>Events</p>
              </div>
            </div>

            <Link
              to={`/doctor/patients/${patient.id}`}
              className="mt-4 inline-flex items-center justify-center rounded-card border border-borderTheme bg-card px-3 py-2 text-small font-semibold text-ink transition-colors hover:border-primary/40 hover:text-primary"
            >
              Open patient detail →
            </Link>
          </Card>
        ))}
      </div>

      {visiblePatients.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-h3 font-semibold text-ink">No matching patients</p>
          <p className="mt-2 text-small text-muted">Try another name, ID, or filter.</p>
        </Card>
      )}
    </div>
  );
}

