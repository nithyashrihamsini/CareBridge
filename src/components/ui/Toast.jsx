import { useEffect } from 'react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3800);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isAttention = toast.type === 'attention';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex max-w-md w-11/12 items-center justify-between gap-3 rounded-card bg-ink text-white px-4 py-3 shadow-2xl transition-all duration-200"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {isSuccess ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-white text-xs font-bold">
            ✓
          </span>
        ) : isAttention ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber text-ink text-xs font-bold">
            !
          </span>
        ) : (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
            i
          </span>
        )}
        <p className="text-small font-medium truncate">{toast.message}</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="text-muted hover:text-white text-xs font-bold px-1.5 py-1"
      >
        ✕
      </button>
    </div>
  );
}
