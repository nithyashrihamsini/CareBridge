import { useState } from 'react';

export default function SafetyDisclaimerBanner({ className = '' }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div
      role="region"
      aria-label="Clinical safety disclaimer"
      className={`border-b border-primary/20 bg-primary/5 px-4 py-2 text-small text-ink transition-all ${className}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
            i
          </span>
          <p className="truncate text-xs sm:text-small">
            <span className="font-semibold text-primary">Prototype Notice:</span> CareBridge AI does not diagnose, prescribe, or replace emergency care.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setDetailsOpen((prev) => !prev)}
            className="text-xs font-semibold text-primary underline hover:text-primary-hover focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
          >
            {detailsOpen ? 'Hide guidance' : 'Safety guidance'}
          </button>
        </div>
      </div>
      {detailsOpen ? (
        <div className="mx-auto mt-2 max-w-7xl rounded-md bg-card/80 p-3 text-xs leading-relaxed text-muted border border-borderTheme">
          <p>
            <strong className="text-ink">Important Safety & Continuity Guidelines:</strong> All data logged in this application is strictly patient-reported. Clinical flags require review by your attending healthcare provider. If you feel severe discomfort, sudden pain, difficulty breathing, or any life-threatening condition, <strong>call emergency services (such as 911 / 112 / 999) immediately</strong>.
          </p>
        </div>
      ) : null}
    </div>
  );
}
