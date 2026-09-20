import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';

export default function PatientHomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        title="Today's Care Tasks"
        subtitle="Daily care schedule and wellness check-in will arrive in Milestone 2."
      />
      <EmptyState
        title="Application Foundation Active"
        body="Medication tasks, 0–10 symptom logger, and daily feelings tracking are scheduled for subsequent milestones. The navigation shell, theme engine, and accessibility controls are ready."
        action={
          <Button variant="primary" size="sm" onClick={() => navigate('/patient/appointments')}>
            Preview Visits Shell
          </Button>
        }
      />
    </div>
  );
}

