import { Outlet } from 'react-router-dom';
import DoctorSidebar from '../components/doctor/DoctorSidebar.jsx';
import RoleSwitch from '../components/shared/RoleSwitch.jsx';
import SafetyDisclaimerBanner from '../components/shared/SafetyDisclaimerBanner.jsx';
import ThemeToggle from '../components/shared/ThemeToggle.jsx';

export default function DoctorLayout() {
  return (
    <div className="min-h-screen bg-canvas text-ink transition-colors duration-150 flex flex-col">
      <SafetyDisclaimerBanner />

      <div className="flex min-h-0 flex-1 md:flex">
        <DoctorSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-borderTheme bg-card px-4 py-3 md:px-8 transition-colors duration-150">
            <div className="flex items-center gap-2">
              <p className="text-small font-bold text-ink md:hidden">CareBridge AI</p>
              <div className="hidden items-center gap-2 md:flex">
                <span className="flex h-2.5 w-2.5 rounded-full bg-amber animate-pulse" />
                <p className="text-xs font-semibold text-muted">
                  Clinical Decision-Support Workspace · <span className="text-ink">Synthetic Review Mode</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle compact />
              <RoleSwitch />
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-7xl">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

