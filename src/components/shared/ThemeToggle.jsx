import { useTheme } from '../../context/ThemeContext.jsx';

export default function ThemeToggle({ className = '', compact = false }) {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      id: 'light',
      label: 'Day',
      ariaLabel: 'Switch to Day light mode',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 'warm',
      label: 'Eye-Care',
      ariaLabel: 'Switch to Warm Sepia eye-care mode (low blue light)',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      id: 'dark',
      label: 'Dark',
      ariaLabel: 'Switch to Calm Dark mode',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Color theme selection"
      className={`inline-flex items-center rounded-full bg-card p-1 border border-borderTheme shadow-subtle ${className}`}
    >
      {themes.map((t) => {
        const active = theme === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={t.ariaLabel}
            title={t.ariaLabel}
            onClick={() => setTheme(t.id)}
            className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full px-2.5 text-small font-medium transition-all ${
              active
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted hover:text-ink hover:bg-canvas'
            } ${compact ? 'px-2' : ''}`}
          >
            {t.icon}
            {!compact ? <span>{t.label}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
