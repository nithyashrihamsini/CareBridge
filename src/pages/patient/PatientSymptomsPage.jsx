import Badge from '../../components/ui/Badge.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';

export default function PatientSymptomsPage() {
  return (
    <div>
      <PageHeader
        title="Symptoms"
        subtitle="Patient-reported scores and notes are not collected yet."
        actions={<Badge tone="reported">Patient-reported</Badge>}
      />
      <EmptyState
        title="No patient-reported entries"
        body="Symptom logging and charts are reserved for a later milestone. This is a navigation placeholder only."
      />
    </div>
  );
}
