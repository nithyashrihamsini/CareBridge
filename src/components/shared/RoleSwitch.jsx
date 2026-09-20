import { Link, useLocation, useNavigate } from 'react-router-dom';

const roles = [
  { id: 'patient', label: 'Patient', path: '/patient' },
  { id: 'doctor', label: 'Doctor', path: '/doctor' },
];

export default function RoleSwitch({ className = '' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const active = location.pathname.startsWith('/doctor') ? 'doctor' : 'patient';

  return (
    <div
      role="group"
      aria-label="Demo role selector"
      className={`inline-flex items-center shrink-0 rounded-full bg-card border border-borderTheme p-1 shadow-subtle ${className}`}
    >
      <span className="sr-only">Current Role: {active}</span>
      {roles.map((role) => {
        const selected = active === role.id;
        return (
          <button
            key={role.id}
            type="button"
            aria-pressed={selected}
            onClick={() => navigate(role.path)}
            className={`min-h-[36px] rounded-full px-3 text-small font-semibold transition-all ${
              selected
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted hover:text-ink hover:bg-canvas'
            }`}
          >
            {role.label}
          </button>
        );
      })}
      <Link
        to="/"
        title="Exit to role select landing"
        className="inline-flex min-h-[36px] items-center rounded-full px-2.5 text-xs font-semibold text-muted hover:text-ink hover:bg-canvas transition-colors"
      >
        Exit
      </Link>
    </div>
  );
}

