export default function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  ...props
}) {
  const baseClasses = 'animate-pulse bg-muted/20 dark:bg-muted/30';

  const variantClasses = {
    rectangular: 'rounded-card',
    circular: 'rounded-full',
    text: 'rounded h-4 my-1',
  };

  return (
    <div
      aria-hidden="true"
      className={`${baseClasses} ${variantClasses[variant] ?? variantClasses.rectangular} ${className}`}
      style={{ width, height }}
      {...props}
    />
  );
}
