import { useEffect } from 'react';

export default function Modal({ open, title, children, onClose, className = '' }) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        onClose?.();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative z-10 max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-card bg-card border border-borderTheme p-6 shadow-card transition-all ${className}`}
      >
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-borderTheme pb-3">
          <h2 id="modal-title" className="text-h3 font-semibold text-ink">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close dialog"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-muted hover:text-ink hover:bg-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={onClose}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-body text-ink">
          {children}
        </div>
      </div>
    </div>
  );
}

