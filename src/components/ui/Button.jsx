export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-subtle active:scale-[0.99]',
    secondary: 'bg-secondary text-ink hover:bg-secondary-hover shadow-subtle active:scale-[0.99]',
    tertiary: 'bg-card text-ink border border-borderTheme hover:bg-muted/10 active:scale-[0.99]',
    taken: 'bg-success text-white hover:bg-success/90 shadow-subtle active:scale-[0.99]',
    critical: 'bg-critical text-white hover:bg-critical/90 shadow-subtle active:scale-[0.99]',
    ghost: 'bg-transparent text-muted hover:text-ink hover:bg-muted/10',
  };

  const sizes = {
    sm: 'min-h-[36px] px-3 text-small',
    md: 'min-h-[44px] px-4 text-body',
    lg: 'min-h-[48px] px-6 text-body font-bold',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-card font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

