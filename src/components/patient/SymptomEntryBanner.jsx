import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import Card from '../ui/Card.jsx';

export default function SymptomEntryBanner() {
  const navigate = useNavigate();

  return (
    <Card className="border border-secondary/40 bg-secondary/10 transition-all hover:border-secondary/60">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-ink font-bold shadow-subtle">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-h3 font-bold text-ink">Experiencing Symptoms?</h3>
              <Badge tone="patient-reported">Patient-Reported</Badge>
            </div>
            <p className="mt-1 text-xs text-muted leading-relaxed">
              Log headache, fatigue, pain, nausea, or shortness of breath on a 0–10 severity scale.
            </p>
          </div>
        </div>

        <div className="shrink-0 pt-2 sm:pt-0">
          <Button
            variant="secondary"
            size="sm"
            className="w-full sm:w-auto font-bold"
            onClick={() => navigate('/patient/symptoms')}
          >
            Log Symptoms →
          </Button>
        </div>
      </div>
    </Card>
  );
}
