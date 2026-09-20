import { NavLink, useParams } from 'react-router-dom';
import { demoDoctor } from '../../data/demoUsers.js';

export default function DoctorSidebar() {
  const { patientId } = useParams();

  const links = [
    {
      to: '/doctor',
      label: 'Patient Roster',
      end: true,
      icon: (
        <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    patientId
      ? {
          to: `/doctor/patients/${patientId}`,
          label: 'Patient Timeline',
          end: true,
          icon: (
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        }
      : null,
    patientId
      ? {
          to: `/doctor/patients/${patientId}/report`,
          label: 'Progress Report',
          icon: (
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
        }
      : null,
  ].filter(Boolean);

  return (
    <aside className="border-b border-borderTheme bg-card md:h-full md:w-64 md:border-b-0 md:border-r transition-colors duration-150">
      <div className="hidden px-6 py-6 md:block">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold shadow-subtle">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <p className="text-h3 font-bold text-ink leading-tight">CareBridge AI</p>
            <p className="text-xs font-semibold text-primary">Clinical Review</p>
          </div>
        </div>

        <div className="mt-5 rounded-card bg-canvas p-3 border border-borderTheme">
          <p className="text-small font-bold text-ink">{demoDoctor.displayName}</p>
          <p className="text-xs text-muted">Attending Clinician (Demo)</p>
          <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
            Workspace Active
          </span>
        </div>
      </div>

      <nav aria-label="Doctor workspace navigation" className="flex gap-1 overflow-x-auto p-3 md:flex-col md:px-4 md:py-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex min-h-[44px] items-center gap-3 whitespace-nowrap rounded-card px-3.5 py-2.5 text-small font-semibold transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-subtle'
                  : 'text-muted hover:bg-canvas hover:text-ink'
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

