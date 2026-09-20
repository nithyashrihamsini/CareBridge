import EmptyState from '../../components/ui/EmptyState.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';

export default function PatientAppointmentsPage() {
  return (
    <div>
      <PageHeader
        title="Upcoming visits"
        subtitle="Display-only appointments will be added with mock data later."
      />
      <EmptyState
        title="No appointments in this shell"
        body="This screen exists so the patient bottom navigation can be tested."
      />
    </div>
  );
}
