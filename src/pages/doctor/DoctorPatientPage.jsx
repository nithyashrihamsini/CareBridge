import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';
import { getDemoPatient } from '../../data/demoUsers.js';

export default function DoctorPatientPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const patient = getDemoPatient(patientId);

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
    <div>
      <PageHeader
        title={patient.displayName}
        subtitle={`Synthetic Profile ID: ${patient.id} · Timeline and severity metrics arrive in Milestone 2.`}
        actions={
          <div className="flex items-center gap-2">
            <Badge tone="review">Requires Professional Review</Badge>
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => navigate(`/doctor/patients/${patient.id}/report`)}
            >
              Open Report Shell
            </Button>
          </div>
        }
      />
      <EmptyState
        title="Patient Care Story Shell"
        body="Chronological activity timeline, 0–10 symptom trajectories, adherence stats, and verbatim patient notes will populate here from shared synthetic activity records."
      />
    </div>
  );
}

