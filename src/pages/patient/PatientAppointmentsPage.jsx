import AppointmentCard from '../../components/patient/AppointmentCard.jsx';
import Badge from '../../components/ui/Badge.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';
import { useCare } from '../../context/CareContext.jsx';

export default function PatientAppointmentsPage() {
  const { appointments, updateAppointment } = useCare();

  return (
    <div className="space-y-4">
      <PageHeader
        title="Clinical Appointments"
        subtitle="Upcoming follow-ups and care-plan consultations with your healthcare team."
        actions={<Badge tone="default">{appointments.length} Scheduled</Badge>}
      />

      {appointments.length === 0 ? (
        <EmptyState
          title="No upcoming visits"
          body="Your care team will schedule your next clinic consultation."
        />
      ) : (
        <div className="space-y-3">
          {appointments.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              onUpdateStatus={updateAppointment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

