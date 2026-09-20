import { NavLink } from 'react-router-dom';

const items = [
  {
    to: '/patient',
    label: 'Today',
    end: true,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    to: '/patient/appointments',
    label: 'Visits',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    to: '/patient/symptoms',
    label: 'Symptoms',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function PatientBottomNav() {
  return (
    <nav
      aria-label="Patient navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-borderTheme bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur transition-colors duration-150 md:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-3">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex min-h-[56px] flex-col items-center justify-center gap-1 text-xs font-semibold transition-colors ${
                  isActive ? 'text-primary font-bold' : 'text-muted hover:text-ink'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

