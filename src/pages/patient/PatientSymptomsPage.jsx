import { useState } from 'react';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';
import { useCare, getInterfaceFlag } from '../../context/CareContext.jsx';

const SYMPTOM_OPTIONS = [
  'Headache',
  'Fatigue',
  'Nausea',
  'Dizziness',
  'Pain',
  'Shortness of breath',
  'Other',
];

const TREND_OPTIONS = ['Better than usual', 'Same as usual', 'Worse than usual'];

const initialForm = {
  symptom: '',
  severity: 0,
  duration: '',
  trend: '',
  note: '',
};

export default function PatientSymptomsPage() {
  const { logSymptom } = useCare();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = (requestHelp = false) => {
    const symptom = form.symptom.trim();
    const duration = form.duration.trim();
    const note = form.note.trim();

    if (!symptom) {
      setError('Please choose a symptom before submitting.');
      return;
    }

    if (form.severity < 0 || form.severity > 10) {
      setError('Please choose a severity from 0 to 10.');
      return;
    }

    if (!duration) {
      setError('Please enter how long this symptom has been present.');
      return;
    }

    if (!form.trend) {
      setError('Please tell us how this compares to your usual experience.');
      return;
    }

    setIsSubmitting(true);
    const result = logSymptom({
      symptom,
      severity: form.severity,
      duration,
      trend: form.trend,
      note,
      requestHelp,
    });

    const flag = result?.flag || getInterfaceFlag(form.severity, form.trend);

    setConfirmation({
      symptom,
      severity: form.severity,
      duration,
      comparison: form.trend,
      note,
      flag,
      requestHelp,
      timestamp: new Date().toLocaleString(),
    });
    setForm(initialForm);
    setError('');
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Symptom Check-In"
        subtitle="Record patient-reported symptoms using a clear 0–10 severity scale."
        actions={<Badge tone="patient-reported">Patient-Reported</Badge>}
      />

      {!confirmation ? (
        <Card className="space-y-6 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Symptom</p>
              <h2 className="mt-1 text-h3 font-bold text-ink">Select a symptom</h2>
            </div>
            <Badge tone="patient-reported">Patient-Reported</Badge>
          </div>

          <div className="space-y-2" aria-label="Symptom choices">
            {SYMPTOM_OPTIONS.map((option) => {
              const selected = form.symptom === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateField('symptom', option)}
                  aria-pressed={selected}
                  className={`w-full rounded-card border px-4 py-3 text-left text-small font-medium transition-colors ${
                    selected
                      ? 'border-primary bg-primary/10 text-ink'
                      : 'border-borderTheme bg-card text-muted hover:border-primary/40 hover:text-ink'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="space-y-3 rounded-card border border-borderTheme bg-canvas p-4">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="severity" className="text-small font-semibold text-ink">
                Severity (0–10)
              </label>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                {form.severity}/10
              </span>
            </div>
            <input
              id="severity"
              type="range"
              min="0"
              max="10"
              step="1"
              value={form.severity}
              aria-valuetext={`${form.severity} out of 10`}
              onChange={(event) => updateField('severity', Number(event.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex items-center justify-between text-[11px] text-muted">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="duration" className="block text-small font-semibold text-ink">
              Duration
            </label>
            <input
              id="duration"
              type="text"
              value={form.duration}
              aria-invalid={Boolean(error && !form.duration.trim())}
              aria-describedby="duration-help"
              onChange={(event) => updateField('duration', event.target.value)}
              placeholder="e.g., 2 days, 1 week, 3 hours"
              className="w-full rounded-card border border-borderTheme bg-card px-3 py-3 text-small text-ink placeholder:text-muted focus:border-primary focus:outline-none"
            />
            <p id="duration-help" className="text-[11px] text-muted">Enter how long this symptom has been present.</p>
          </div>

          <div className="space-y-3">
            <p className="text-small font-semibold text-ink">Compared with your usual experience</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {TREND_OPTIONS.map((option) => {
                const selected = form.trend === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateField('trend', option)}
                    aria-pressed={selected}
                    className={`rounded-card border px-3 py-2.5 text-small font-medium transition-colors ${
                      selected
                        ? 'border-primary bg-primary/10 text-ink'
                        : 'border-borderTheme bg-card text-muted hover:border-primary/40 hover:text-ink'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="note" className="block text-small font-semibold text-ink">
              Optional patient note
            </label>
            <textarea
              id="note"
              value={form.note}
              onChange={(event) => updateField('note', event.target.value)}
              rows="4"
              placeholder="Optional note: add your own words only. This is patient-provided information and is not interpreted."
              className="w-full rounded-card border border-borderTheme bg-card px-3 py-3 text-small text-ink placeholder:text-muted focus:border-primary focus:outline-none"
            />
          </div>

          {error && (
            <div role="alert" className="rounded-card border border-red-200 bg-red-50 px-3 py-2 text-small font-medium text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" onClick={() => handleSubmit(false)} className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Symptom Check-In'}
            </Button>
            <Button type="button" variant="critical" onClick={() => handleSubmit(true)} className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Sending help request...' : 'Request Help'}
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="space-y-4 p-5 sm:p-6" role="status" aria-live="polite">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-h3 font-bold text-ink">
              {confirmation.requestHelp ? 'Help request recorded' : 'Symptom recorded'}
            </h2>
            <Badge tone="patient-reported">Patient-Reported</Badge>
          </div>

          <div className="rounded-card border border-borderTheme bg-canvas p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Interface flag</span>
              <Badge tone={confirmation.flag === 'Requires Professional Review' ? 'review' : confirmation.flag === 'Attention' ? 'default' : 'stable'}>
                {confirmation.flag}
              </Badge>
            </div>
            <p className="text-small text-muted">
              This is a patient-reported interface flag only. It is not a diagnosis.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 text-small text-muted">
            <div className="rounded-card border border-borderTheme bg-card p-3">
              <p className="font-semibold text-ink">Symptom</p>
              <p>{confirmation.symptom}</p>
            </div>
            <div className="rounded-card border border-borderTheme bg-card p-3">
              <p className="font-semibold text-ink">Severity</p>
              <p>{confirmation.severity}/10</p>
            </div>
            <div className="rounded-card border border-borderTheme bg-card p-3">
              <p className="font-semibold text-ink">Duration</p>
              <p>{confirmation.duration}</p>
            </div>
            <div className="rounded-card border border-borderTheme bg-card p-3">
              <p className="font-semibold text-ink">Compared with usual</p>
              <p>{confirmation.comparison}</p>
            </div>
          </div>

          {confirmation.note && (
            <div className="rounded-card border border-borderTheme bg-card p-3 text-small text-muted">
              <p className="font-semibold text-ink">Patient note</p>
              <p className="mt-1 whitespace-pre-wrap">"{confirmation.note}"</p>
            </div>
          )}

          <div className="rounded-card border border-borderTheme bg-card p-3 text-small text-muted">
            <p className="font-semibold text-ink">Recorded at</p>
            <p className="mt-1">{confirmation.timestamp}</p>
          </div>

          <Button type="button" variant="secondary" onClick={() => setConfirmation(null)} className="w-full sm:w-auto">
            Record another symptom
          </Button>
        </Card>
      )}
    </div>
  );
}
