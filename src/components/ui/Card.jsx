export default function Card({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component
      className={`rounded-card bg-card border border-borderTheme p-5 shadow-card transition-colors duration-150 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

