import { useState } from 'react';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import Card from '../ui/Card.jsx';
import Modal from '../ui/Modal.jsx';

export default function MedicationTaskCard({ medication, onMarkTaken, onMarkMissed }) {
  const [modalType, setModalType] = useState(null); // 'taken_note' | 'missed_reason' | null
  const [noteText, setNoteText] = useState('');

  const isPending = medication.status === 'pending';
  const isTaken = medication.status === 'taken';
  const isMissed = medication.status === 'missed';

  const handleOpenMissedModal = () => {
    setNoteText(medication.note || '');
    setModalType('missed_reason');
  };

  const handleOpenTakenModal = () => {
    setNoteText(medication.note || '');
    setModalType('taken_note');
  };

  const handleConfirmTaken = () => {
    onMarkTaken(medication.id, noteText);
    setModalType(null);
  };

  const handleConfirmMissed = () => {
    onMarkMissed(medication.id, noteText);
    setModalType(null);
  };

  return (
    <Card className="flex flex-col justify-between transition-all">
      <div>
        {/* Card Header: Slot & Status */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
              💊
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              {medication.timeSlot} · {medication.scheduleTime}
            </span>
          </div>

          <div>
            {isTaken && (
              <Badge tone="stable" className="flex items-center gap-1">
                <span>✓ Taken</span>
                {medication.actionTime && <span className="opacity-80">({medication.actionTime})</span>}
              </Badge>
            )}
            {isMissed && (
              <Badge tone="missed">
                Missed Dose
              </Badge>
            )}
            {isPending && (
              <Badge tone="default">
                Pending
              </Badge>
            )}
          </div>
        </div>

        {/* Medication Details */}
        <div className="mt-3">
          <h3 className="text-h3 font-bold text-ink">{medication.name}</h3>
          <p className="text-small text-muted font-medium mt-0.5">
            {medication.dosage} · {medication.form}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted bg-canvas p-2.5 rounded-lg border border-borderTheme">
            <strong className="text-ink font-semibold">Instructions:</strong> {medication.instructions}
          </p>
        </div>

        {/* Existing Note Display */}
        {medication.note && (
          <div className="mt-3 rounded-lg bg-primary/5 p-2.5 border border-primary/15 text-xs text-ink">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-primary">Patient Note:</span>
              <Badge tone="patient-reported" className="text-[10px] py-0 px-1.5">Patient-Reported</Badge>
            </div>
            <p className="mt-1 text-muted italic">"{medication.note}"</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-borderTheme">
        {isPending ? (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Button
              variant="taken"
              className="flex-1 justify-center gap-1.5"
              onClick={() => onMarkTaken(medication.id, '')}
            >
              <span>✓ Mark as Taken</span>
            </Button>
            <div className="flex gap-2">
              <Button
                variant="tertiary"
                className="flex-1 sm:flex-none text-xs"
                onClick={handleOpenTakenModal}
                title="Add context note with taken dose"
              >
                + Note
              </Button>
              <Button
                variant="tertiary"
                className="flex-1 sm:flex-none text-xs hover:text-critical"
                onClick={handleOpenMissedModal}
              >
                Missed
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted">
              {isTaken ? 'Dose recorded for today.' : 'Missed dose flagged for review.'}
            </span>
            <button
              type="button"
              onClick={isTaken ? handleOpenTakenModal : handleOpenMissedModal}
              className="text-xs font-semibold text-primary underline hover:text-primary-hover p-1"
            >
              {medication.note ? 'Edit note' : '+ Add note'}
            </button>
          </div>
        )}
      </div>

      {/* Modal for Taken Note */}
      <Modal
        open={modalType === 'taken_note'}
        title={`Note for ${medication.name}`}
        onClose={() => setModalType(null)}
      >
        <div className="space-y-3">
          <p className="text-small text-muted">
            Add an optional personal note explaining how you took this dose (e.g. food eaten, slight delay).
          </p>
          <div>
            <label htmlFor={`note-taken-${medication.id}`} className="block text-xs font-semibold text-ink mb-1">
              Personal Note (Optional)
            </label>
            <textarea
              id={`note-taken-${medication.id}`}
              rows={3}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Took with whole grain toast, 15 minutes after breakfast..."
              className="w-full rounded-card border border-borderTheme bg-canvas p-3 text-small text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setModalType(null)}>
              Cancel
            </Button>
            <Button variant="taken" onClick={handleConfirmTaken}>
              Save as Taken
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal for Missed Reason */}
      <Modal
        open={modalType === 'missed_reason'}
        title={`Record Missed Dose: ${medication.name}`}
        onClose={() => setModalType(null)}
      >
        <div className="space-y-3">
          <p className="text-small text-muted">
            Recording missed doses helps your doctor understand adherence without guesswork. What happened?
          </p>

          {/* Quick reason suggestions */}
          <div className="flex flex-wrap gap-1.5">
            {['Felt unwell / nauseous', 'Traveling / Away', 'Forgot medication', 'Ran out of supply'].map((reason) => (
              <button
                key={reason}
                type="button"
                onClick={() => setNoteText(reason)}
                className="rounded-full bg-canvas border border-borderTheme px-2.5 py-1 text-xs text-muted hover:text-ink hover:border-primary/40 transition-colors"
              >
                + {reason}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor={`note-missed-${medication.id}`} className="block text-xs font-semibold text-ink mb-1">
              Reason or Explanation (Optional)
            </label>
            <textarea
              id={`note-missed-${medication.id}`}
              rows={3}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Was travelling on highway without water bottle..."
              className="w-full rounded-card border border-borderTheme bg-canvas p-3 text-small text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setModalType(null)}>
              Cancel
            </Button>
            <Button variant="critical" onClick={handleConfirmMissed}>
              Confirm Missed Dose
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
