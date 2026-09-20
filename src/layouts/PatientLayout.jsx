import { NavLink, Outlet } from 'react-router-dom';
import PatientBottomNav from '../components/patient/PatientBottomNav.jsx';
import RoleSwitch from '../components/shared/RoleSwitch.jsx';
import SafetyDisclaimerBanner from '../components/shared/SafetyDisclaimerBanner.jsx';
import ThemeToggle from '../components/shared/ThemeToggle.jsx';
import { demoPatients } from '../data/demoUsers.js';

const patientLinks = [
  { to: '/patient', label: 'Today', end: true },
  { to: '/patient/appointments', label: 'Visits' },
  { to: '/patient/symptoms', label: 'Symptoms' },
];

export default function PatientLayout() {
  const demoPatient = demoPatients[0];

  return (
    <div className="min-h-screen bg-canvas text-ink transition-colors duration-150 flex flex-col">
      <SafetyDisclaimerBanner />

      <header className="sticky top-0 z-30 border-b border-borderTheme bg-card/95 px-4 py-3 backdrop-blur transition-colors duration-150">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white text-xs font-bold">
                +
              </span>
              <p className="text-small font-bold text-ink">CareBridge AI</p>
            </div>
            <p className="truncate text-xs text-muted mt-0.5">
              <span className="font-semibold text-primary">{demoPatient.displayName}</span> · Demo Patient
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <ThemeToggle compact />
            <RoleSwitch />
          </div>
        </div>

        {/* Desktop secondary nav for patient when viewed on larger monitors */}
        <nav aria-label="Patient desktop menu" className="mx-auto mt-2.5 hidden max-w-lg gap-2 md:flex">
          {patientLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-1.5 text-small font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary text-white shadow-subtle'
                    : 'text-muted hover:bg-canvas hover:text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-5 pb-28 md:pb-12">
        <Outlet />
      </main>

      <PatientBottomNav />
    </div>
  );
}

