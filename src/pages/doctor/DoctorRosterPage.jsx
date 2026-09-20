import { Link } from 'react-router-dom';
import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';
import { demoPatients } from '../../data/demoUsers.js';

export default function DoctorRosterPage() {
  return (
    <div>
      <PageHeader
        title="Assigned Patient Roster"
        subtitle="Synthetic demonstration cohort. Chronological timeline and filters will be wired up in subsequent milestones."
        actions={
          <Badge tone="default">Synthetic Demo Data</Badge>
        }
      />
      <ul className="grid gap-3.5">
        {demoPatients.map((patient) => (
          <li key={patient.id}>
            <Card
              as={Link}
              to={`/doctor/patients/${patient.id}`}
              className="block hover:border-primary/50 hover:shadow-card transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-small">
                    {patient.displayName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-h3 font-semibold text-ink">{patient.displayName}</p>
                    <p className="text-xs text-muted">ID: {patient.id} · Synthetic Demo Record</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={patient.status === 'active' ? 'stable' : 'default'}>
                    {patient.status}
                  </Badge>
                  <svg className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

