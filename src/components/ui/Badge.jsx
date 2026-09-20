const styles = {
  default: 'bg-primary/15 text-primary border border-primary/35',
  'patient-reported': 'bg-secondary/25 text-ink border border-secondary/50',
  reported: 'bg-secondary/25 text-ink border border-secondary/50',
  review: 'bg-amber-light text-amber-text border border-amber/50 font-bold',
  'requires-review': 'bg-amber-light text-amber-text border border-amber/50 font-bold',
  missed: 'bg-critical-light text-critical-text border border-critical/50 font-bold',
  stable: 'bg-success-light text-success-text border border-success/50',
  success: 'bg-success-light text-success-text border border-success/50',
};

export default function Badge({ children, tone = 'default', className = '' }) {
  const selectedStyle = styles[tone.toLowerCase()] ?? styles.default;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide ${selectedStyle} ${className}`}
    >
      {children}
    </span>
  );
}

