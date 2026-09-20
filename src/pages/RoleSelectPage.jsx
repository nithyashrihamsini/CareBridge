import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SafetyDisclaimerBanner from '../components/shared/SafetyDisclaimerBanner.jsx';
import ThemeToggle from '../components/shared/ThemeToggle.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import Modal from '../components/ui/Modal.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import { demoDoctor, demoPatients } from '../data/demoUsers.js';

export default function RoleSelectPage() {
  const navigate = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas text-ink transition-colors duration-150 flex flex-col">
      <SafetyDisclaimerBanner />

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-4 py-12">
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-subtle">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-h1 font-extrabold tracking-tight text-ink">CareBridge AI</h1>
                <Badge tone="default">Prototype</Badge>
              </div>
              <p className="text-small text-muted font-medium">
                From daily care activities to meaningful clinical insight.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="tertiary" size="sm" onClick={() => setAboutOpen(true)}>
              About Prototype
            </Button>
          </div>
        </div>

        <div className="mb-8 rounded-card border border-primary/20 bg-primary/5 p-4 text-small text-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-ink">Hackathon Theme: Tech for a Better Tomorrow</p>
            <p className="text-xs text-muted mt-0.5">
              Care-continuity and decision-support prototype. Select a role below to explore the application foundation.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
            Milestone 1 Active
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Patient Role Card */}
          <Card className="flex flex-col justify-between hover:border-primary/40 hover:shadow-card transition-all">
            <div>
              <div className="flex items-center justify-between">
                <Badge tone="patient-reported">Patient-Reported</Badge>
                <span className="text-xs font-semibold text-muted">Mobile View</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-ink font-bold text-small">
                  AR
                </div>
                <div>
                  <h2 className="text-h2 font-bold text-ink">{demoPatients[0].displayName}</h2>
                  <p className="text-xs text-muted">Synthetic Patient Profile</p>
                </div>
              </div>
              <p className="mt-3 text-small text-muted leading-relaxed">
                Experience the patient-facing interface designed for mobile accessibility, high-contrast readability, and calm daily wellness check-ins.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-borderTheme">
              <Button
                variant="primary"
                className="w-full justify-center gap-2"
                onClick={() => navigate('/patient')}
              >
                <span>Enter Patient View</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </div>
          </Card>

          {/* Doctor Role Card */}
          <Card className="flex flex-col justify-between hover:border-primary/40 hover:shadow-card transition-all">
            <div>
              <div className="flex items-center justify-between">
                <Badge tone="review">Requires Professional Review</Badge>
                <span className="text-xs font-semibold text-muted">Desktop View</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary font-bold text-small">
                  PS
                </div>
                <div>
                  <h2 className="text-h2 font-bold text-ink">{demoDoctor.displayName}</h2>
                  <p className="text-xs text-muted">Attending Clinician (Demo)</p>
                </div>
              </div>
              <p className="mt-3 text-small text-muted leading-relaxed">
                Experience the clinician dashboard tailored for desktop review, patient adherence filtering, activity timelines, and structured progress reports.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-borderTheme">
              <Button
                variant="secondary"
                className="w-full justify-center gap-2"
                onClick={() => navigate('/doctor')}
              >
                <span>Enter Doctor Workspace</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-8 rounded-card bg-card border border-borderTheme p-4 text-center">
          <p className="text-xs text-muted">
            CareBridge AI uses purely synthetic demonstration identities. All data is managed locally in-memory. The application does not formulate clinical diagnoses or alter medical regimens.
          </p>
        </div>
      </div>

      <Modal open={aboutOpen} title="About CareBridge AI Prototype" onClose={() => setAboutOpen(false)}>
        <div className="space-y-3 text-small leading-relaxed text-muted">
          <p>
            <strong className="text-ink">Care-Continuity Mission:</strong> Chronic disease management frequently suffers from communication gaps between clinic visits. Patients forget details, and physicians lack structured longitudinal context.
          </p>
          <p>
            CareBridge AI captures patient-reported medication adherence, symptom trajectories, and verbatim notes to construct a verifiable care story for the doctor's consultation.
          </p>
          <div className="rounded-card bg-canvas p-3 border border-borderTheme text-xs">
            <p className="font-semibold text-ink">Built-in Accessibility & Eye Care:</p>
            <p className="mt-1">
              Supports <strong>Standard Day</strong>, <strong>Low-Blue-Light Eye-Care Warm</strong> (sepia tones for reduced optical fatigue), and <strong>Calm Dark</strong> modes.
            </p>
          </div>
        </div>
        <Button className="mt-6 w-full" onClick={() => setAboutOpen(false)}>
          Back to Demo
        </Button>
      </Modal>
    </div>
  );
}

