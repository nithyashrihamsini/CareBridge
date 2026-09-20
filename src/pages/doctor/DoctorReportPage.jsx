import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';
import { getDemoPatient } from '../../data/demoUsers.js';

export default function DoctorReportPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const patient = getDemoPatient(patientId);

  return (
    <div>
      <PageHeader
        title="Clinical Progress Report Shell"
        subtitle={
          patient
            ? `Structured report layout for ${patient.displayName}. Date-range filtering and print-to-PDF will arrive in Milestone 4.`
            : 'Unknown synthetic patient.'
        }
        actions={
          <div className="flex items-center gap-2">
            <Badge tone="default">Print-Ready Engine Shell</Badge>
            <Button variant="tertiary" size="sm" onClick={() => navigate('/doctor')}>
              Back to Roster
            </Button>
          </div>
        }
      />
      <EmptyState
        title="Report Generator Shell"
        body="When the report engine is activated, it will feature configurable 7/14/30-day filters, factual AI summaries, adherence breakdowns, symptom trajectories, and the required clinical disclaimer."
      />
    </div>
  );
}

