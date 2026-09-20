export default function EmptyState({
  title,
  body,
  action,
  icon,
  className = '',
}) {
  return (
    <div className={`rounded-card border border-dashed border-primary/25 bg-card p-8 text-center shadow-subtle ${className}`}>
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon || (
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      <h3 className="text-h3 font-semibold text-ink">{title}</h3>
      {body ? <p className="mx-auto mt-2 max-w-md text-small text-muted leading-relaxed">{body}</p> : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

