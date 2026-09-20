import { useState } from 'react';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import Card from '../ui/Card.jsx';

const FEELING_OPTIONS = [
  { id: 'Good', emoji: '😊', label: 'Good / Energetic' },
  { id: 'Fair', emoji: '😐', label: 'Fair / Stable' },
  { id: 'Fatigued', emoji: '😴', label: 'Tired / Fatigued' },
  { id: 'Stressed', emoji: '😟', label: 'Stressed / Anxious' },
  { id: 'Unwell', emoji: '🤒', label: 'Unwell / Achy' },
];

export default function DailyFeelingCard({ currentFeeling, onRecordFeeling }) {
  const [selectedMood, setSelectedMood] = useState(currentFeeling?.feeling || 'Good');
  const [noteText, setNoteText] = useState(currentFeeling?.note || '');
  const [isEditing, setIsEditing] = useState(!currentFeeling);

  const handleSubmit = (e) => {
    e?.preventDefault();
    onRecordFeeling(selectedMood, noteText);
    setIsEditing(false);
  };

  return (
    <Card className="transition-all">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/20 text-ink text-sm font-bold">
            🌱
          </span>
          <div>
            <h3 className="text-h3 font-bold text-ink">Daily Feeling Check-in</h3>
            <p className="text-xs text-muted">How have you felt overall today?</p>
          </div>
        </div>

        <div>
          {currentFeeling && !isEditing ? (
            <Badge tone="patient-reported">Recorded</Badge>
          ) : (
            <Badge tone="default">Daily Check-in</Badge>
          )}
        </div>
      </div>

      {!isEditing && currentFeeling ? (
        <div className="mt-4 rounded-card bg-canvas p-4 border border-borderTheme">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">
                {FEELING_OPTIONS.find((f) => f.id === currentFeeling.feeling)?.emoji || '😊'}
              </span>
              <div>
                <p className="font-bold text-ink">{currentFeeling.feeling}</p>
                <p className="text-xs text-muted">Logged at {currentFeeling.time} today</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-xs font-semibold text-primary underline hover:text-primary-hover p-1"
            >
              Update
            </button>
          </div>

          {currentFeeling.note && (
            <p className="mt-2.5 text-xs text-muted italic border-t border-borderTheme pt-2">
              "{currentFeeling.note}"
            </p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {/* Quick mood selector buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {FEELING_OPTIONS.map((option) => {
              const selected = selectedMood === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedMood(option.id)}
                  className={`flex min-h-[44px] items-center gap-2 rounded-card p-2.5 text-xs font-semibold border transition-all text-left ${
                    selected
                      ? 'border-primary bg-primary/10 text-primary shadow-subtle ring-1 ring-primary'
                      : 'border-borderTheme bg-canvas text-muted hover:text-ink hover:border-primary/30'
                  }`}
                >
                  <span className="text-lg">{option.emoji}</span>
                  <span className="truncate">{option.label}</span>
                </button>
              );
            })}
          </div>

          <div>
            <label htmlFor="daily-feeling-note" className="block text-xs font-semibold text-ink mb-1">
              Personal Context or Note (Optional)
            </label>
            <input
              id="daily-feeling-note"
              type="text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Felt tired today, slept late, took a walk..."
              className="w-full rounded-card border border-borderTheme bg-canvas px-3.5 py-2.5 text-small text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            {currentFeeling && (
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            )}
            <Button variant="primary" size="sm" type="submit">
              Save Feeling
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
}
