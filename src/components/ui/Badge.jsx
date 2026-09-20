const styles = {
  default: 'bg-primary/15 text-primary border border-primary/20',
  'patient-reported': 'bg-secondary/20 text-ink border border-secondary/30',
  reported: 'bg-secondary/20 text-ink border border-secondary/30',
  review: 'bg-amber-light text-amber-text border border-amber/30 font-bold',
  'requires-review': 'bg-amber-light text-amber-text border border-amber/30 font-bold',
  missed: 'bg-critical-light text-critical-text border border-critical/30 font-bold',
  stable: 'bg-success-light text-success-text border border-success/30',
  success: 'bg-success-light text-success-text border border-success/30',
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

