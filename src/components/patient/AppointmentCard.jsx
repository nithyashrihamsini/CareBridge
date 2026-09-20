import { useState } from 'react';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import Card from '../ui/Card.jsx';
import Modal from '../ui/Modal.jsx';

export default function AppointmentCard({ appointment, onUpdateStatus }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState('attended'); // 'attended' | 'rescheduled' | 'note'
  const [note, setNote] = useState('');

  const isAttended = appointment.status === 'attended' || appointment.status === 'confirmed';
  const isRescheduled = appointment.status === 'rescheduled';
  const isMissed = appointment.status === 'missed';

  const handleOpenModal = (type) => {
    setActionType(type);
    setNote('');
    setModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (actionType === 'attended') {
      onUpdateStatus(appointment.id, 'attended', note || 'Confirmed attendance with clinical team');
    } else if (actionType === 'rescheduled') {
      onUpdateStatus(appointment.id, 'rescheduled', note || 'Requested reschedule due to scheduling conflict');
    } else if (actionType === 'missed') {
      onUpdateStatus(appointment.id, 'missed', note || 'Unable to attend appointment');
    }
    setModalOpen(false);
  };

  return (
    <Card className="transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
            📅
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Upcoming Clinical Visit
            </span>
            <h3 className="text-h3 font-bold text-ink mt-0.5">{appointment.title}</h3>
          </div>
        </div>

        <div>
          {isAttended && <Badge tone="stable">Confirmed</Badge>}
          {isRescheduled && <Badge tone="review">Reschedule Requested</Badge>}
          {isMissed && <Badge tone="missed">Missed Visit</Badge>}
          {!isAttended && !isRescheduled && !isMissed && <Badge tone="default">Scheduled</Badge>}
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 rounded-card bg-canvas p-3.5 border border-borderTheme text-small">
        <div>
          <p className="text-xs text-muted font-medium">Provider & Clinic</p>
          <p className="font-semibold text-ink">{appointment.doctorName}</p>
          <p className="text-xs text-muted">{appointment.specialty}</p>
        </div>
        <div>
          <p className="text-xs text-muted font-medium">Date, Time & Room</p>
          <p className="font-semibold text-ink">{appointment.scheduledDate} · {appointment.scheduledTime}</p>
          <p className="text-xs text-muted">{appointment.location}</p>
        </div>
      </div>

      {appointment.notes && (
        <p className="mt-3 text-xs text-muted leading-relaxed">
          <strong className="text-ink">Clinic Note:</strong> {appointment.notes}
        </p>
      )}

      {/* Action triggers */}
      <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-borderTheme">
        {!isAttended ? (
          <>
            <Button
              variant="primary"
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => handleOpenModal('attended')}
            >
              ✓ Confirm Visit Attendance
            </Button>
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => handleOpenModal('rescheduled')}
            >
              Reschedule
            </Button>
            <Button
              variant="tertiary"
              size="sm"
              className="hover:text-critical"
              onClick={() => handleOpenModal('missed')}
            >
              Can't Attend
            </Button>
          </>
        ) : (
          <div className="flex w-full items-center justify-between text-xs text-muted">
            <span className="text-success font-semibold">✓ Attendance recorded for upcoming consultation</span>
            <button
              type="button"
              onClick={() => handleOpenModal('rescheduled')}
              className="text-primary underline hover:text-primary-hover font-semibold"
            >
              Update visit
            </button>
          </div>
        )}
      </div>

      {/* Action modal */}
      <Modal
        open={modalOpen}
        title={
          actionType === 'attended'
            ? 'Confirm Appointment Attendance'
            : actionType === 'rescheduled'
            ? 'Request Appointment Reschedule'
            : 'Record Missed Appointment'
        }
        onClose={() => setModalOpen(false)}
      >
        <div className="space-y-3 text-small">
          <p className="text-muted">
            {actionType === 'attended'
              ? `Confirming that you plan to attend the visit with ${appointment.doctorName}.`
              : 'Add an optional note explaining transport, schedule, or symptoms for your clinician.'}
          </p>
          <div>
            <label htmlFor="appointment-note" className="block text-xs font-semibold text-ink mb-1">
              Personal Note for Care Team (Optional)
            </label>
            <textarea
              id="appointment-note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Need transport assistance / Will arrive 10 mins early..."
              className="w-full rounded-card border border-borderTheme bg-canvas p-3 text-small text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={actionType === 'missed' ? 'critical' : actionType === 'rescheduled' ? 'secondary' : 'primary'}
              onClick={handleConfirmAction}
            >
              Save & Log Activity
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
