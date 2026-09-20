export default function PageHeader({ title, subtitle, actions, className = '' }) {
  return (
    <header className={`mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${className}`}>
      <div>
        <h1 className="text-h1 font-bold text-ink tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-1 text-small text-muted leading-normal">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2.5">{actions}</div> : null}
    </header>
  );
}

