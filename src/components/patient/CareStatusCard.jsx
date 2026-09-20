import Badge from '../ui/Badge.jsx';
import Card from '../ui/Card.jsx';

export default function CareStatusCard({ medications = [], dailyFeeling = null }) {
  const totalMeds = medications.length;
  const takenMeds = medications.filter((m) => m.status === 'taken').length;
  const missedMeds = medications.filter((m) => m.status === 'missed').length;
  const pendingMeds = medications.filter((m) => m.status === 'pending').length;

  const totalTasks = totalMeds + 1; // medications + daily checkin
  const completedTasks = takenMeds + missedMeds + (dailyFeeling ? 1 : 0);
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const hasMissed = missedMeds > 0;
  const allComplete = pendingMeds === 0 && dailyFeeling !== null;

  return (
    <Card className="bg-gradient-to-br from-card to-canvas border border-borderTheme">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Today's Care Continuity
          </span>
          <h2 className="text-h2 font-bold text-ink mt-0.5">Care Status Overview</h2>
        </div>

        <div>
          {hasMissed ? (
            <Badge tone="review">Review Flags Active</Badge>
          ) : allComplete ? (
            <Badge tone="stable">All Up to Date</Badge>
          ) : (
            <Badge tone="default">Care Plan Active</Badge>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
          <span className="text-muted">Daily Completion</span>
          <span className="text-ink">{completedTasks} of {totalTasks} items logged ({progressPercent}%)</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-borderTheme">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              hasMissed
                ? 'bg-amber'
                : allComplete
                ? 'bg-success'
                : 'bg-primary'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg bg-card p-2 border border-borderTheme">
          <p className="text-base font-bold text-success">{takenMeds}</p>
          <p className="text-muted text-[11px]">Taken</p>
        </div>
        <div className="rounded-lg bg-card p-2 border border-borderTheme">
          <p className={`text-base font-bold ${missedMeds > 0 ? 'text-critical' : 'text-muted'}`}>{missedMeds}</p>
          <p className="text-muted text-[11px]">Missed</p>
        </div>
        <div className="rounded-lg bg-card p-2 border border-borderTheme">
          <p className="text-base font-bold text-primary">{pendingMeds}</p>
          <p className="text-muted text-[11px]">Pending</p>
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-muted text-center">
        Entries are strictly patient-reported and recorded chronologically for your doctor's review.
      </p>
    </Card>
  );
}
