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

      <Modal open={aboutOpen} title="About CareBridge AI Prototype" onClose={() => setAboutOpen(false)} className="max-w-2xl">
        <div className="space-y-6 text-small leading-relaxed text-muted">
          <section>
            <h3 className="text-h3 font-bold text-ink">What is CareBridge AI?</h3>
            <p className="mt-2">
              CareBridge AI is a care-continuity web application that helps patients record their daily healthcare activities and helps authorized doctors understand what happened between consultations.
            </p>
            <p className="mt-2">
              Patients can record medication activity, appointments, symptoms, severity, feelings, and personal notes. Doctors can then view this information as a structured timeline and generate a progress report for a selected period.
            </p>
            <p className="mt-2">
              The goal is not to replace a doctor. The goal is to reduce the gap between a patient&apos;s day-to-day experience and the limited information available during a consultation.
            </p>
          </section>

          <section>
            <h3 className="text-h3 font-bold text-ink">The problem</h3>
            <p className="mt-2">
              People managing chronic health conditions often receive care instructions during a short appointment but manage most of their care at home. During this period, they may miss medication doses, forget appointments, experience changing symptoms, or struggle to remember the exact sequence of events later.
            </p>
            <p className="mt-2">
              Doctors and healthcare workers may not have enough time to manually monitor every patient between consultations. As a result, important context can be missed. CareBridge AI organizes daily patient-generated information into a clear, chronological, and reviewable format.
            </p>
          </section>

          <section>
            <h3 className="text-h3 font-bold text-ink">How the prototype works</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>The patient opens the application and views daily care tasks.</li>
              <li>The patient marks medication as taken or missed.</li>
              <li>The patient records symptoms, severity, feelings, notes, and appointments.</li>
              <li>Each action becomes a timestamped activity event.</li>
              <li>The doctor views the patient timeline, filters a reporting period, and generates a structured progress report.</li>
            </ol>
          </section>

          <section>
            <h3 className="text-h3 font-bold text-ink">Core prototype features</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                ['Patient care tracking', 'Record medication, appointments, symptoms, feelings, and notes.'],
                ['Patient-reported symptoms', 'Choose a symptom, set severity from 0 to 10, compare it with usual, and add context.'],
                ['Shared activity timeline', 'Review timestamped events in chronological order.'],
                ['Doctor dashboard', 'Review status, adherence, missed doses, appointments, and professional-review flags.'],
                ['Symptom trend view', 'View reported symptom severity over the selected period.'],
                ['Progress report generation', 'Create a report from medication, appointment, symptom, escalation, note, and timeline data.'],
                ['Print-ready report', 'Preview and print or save the report as a PDF using the browser.'],
              ].map(([heading, body]) => (
                <div key={heading} className="rounded-card border border-borderTheme bg-canvas p-3">
                  <p className="font-semibold text-ink">{heading}</p>
                  <p className="mt-1 text-xs">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-card border border-borderTheme bg-canvas p-4">
            <h3 className="text-h3 font-bold text-ink">Current prototype limitations</h3>
            <p className="mt-2">
              This is a hackathon prototype using synthetic demonstration data. It is not connected to a hospital system and does not use real patient information.
            </p>
            <p className="mt-2">
              It does not use external API keys, Gemini API, Firebase, hospital, wearable, SMS, or notification services. Reports are generated from structured local activity data using deterministic application logic.
            </p>
            <p className="mt-2">The automated activity summary counts medication activities, appointments, patient-reported symptoms, severity, escalations, notes, and items requiring professional review.</p>
          </section>

          <section>
            <h3 className="text-h3 font-bold text-ink">Safety and responsible use</h3>
            <p className="mt-2">CareBridge AI is a support and organization tool, not a diagnostic or treatment system.</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>It does not diagnose, prescribe, change medication dosage, or recommend stopping treatment.</li>
              <li>It does not replace a doctor or emergency service and uses synthetic demonstration data.</li>
              <li>Symptoms are labeled patient-reported, alerts require professional review, and original notes are preserved.</li>
            </ul>
            <p className="mt-3 rounded-card border border-borderTheme bg-card p-3 text-xs font-semibold text-ink">
              This prototype is intended for demonstration and care-activity organization only. It does not provide medical diagnosis, treatment, prescription, or emergency advice. Health concerns should be discussed with a qualified healthcare professional.
            </p>
          </section>

          <section>
            <h3 className="text-h3 font-bold text-ink">Future improvements</h3>
            <div className="mt-3 space-y-3">
              {[
                ['Secure AI summaries', 'A future securely configured AI service could summarize supplied activity data, simplify care instructions, and translate patient-facing information without diagnosing or prescribing.'],
                ['Secure authentication and cloud storage', 'Future accounts could provide role-based access and encrypted cloud storage.'],
                ['Healthcare interoperability', 'Authorized integrations could use standards such as HL7 FHIR to exchange healthcare information with electronic health-record systems.'],
                ['Multilingual and low-bandwidth support', 'The app could support more languages, offline capture, delayed synchronization, and SMS-compatible workflows.'],
                ['Notifications', 'Consent-based reminders could be delivered through push notifications, SMS, or email.'],
                ['Wearable and device integration', 'Authorized home-monitoring devices could be connected subject to consent, validation, privacy controls, and safety review.'],
                ['Clinical validation', 'Real-world use would require clinical validation, privacy and security testing, informed consent, professional review, and regulatory assessment.'],
                ['Doctor collaboration', 'Future versions could support review notes, follow-up tasks, escalation acknowledgement, and consultation outcomes.'],
              ].map(([heading, body]) => (
                <div key={heading}>
                  <p className="font-semibold text-ink">{heading}</p>
                  <p className="mt-1 text-xs">{body}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <Button className="mt-6 w-full" onClick={() => setAboutOpen(false)}>
          Back to Demo
        </Button>
      </Modal>
    </div>
  );
}

