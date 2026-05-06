import type { Goal } from "../types/Goal";
import "./GoalCard.css";

type GoalCardProps = {
  goal: Goal;
};

export default function GoalCard({ goal }: GoalCardProps) {
  const progress = Math.min(Math.round((goal.amountSaved / goal.targetPrice) * 100), 100);
  const remaining = goal.targetPrice - goal.amountSaved;

  return (
    <div className="goal-card goal-card-animate">
      {/* Header */}
      <div className="goal-card__header">
        <h2 className="goal-card__name">
          {goal.name}
        </h2>
        <span className="goal-card__badge">
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="goal-card__bar">
        <div
          className="goal-card__bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Amounts */}
      <div className="goal-card__amounts">
        <div>
          <span className="goal-card__label">
            Saved
          </span>
          <span className="goal-card__saved">
            ${goal.amountSaved.toLocaleString()}
          </span>
        </div>

        <div className="goal-card__right">
          <span className="goal-card__label">
            Target
          </span>
          <span className="goal-card__target">
            ${goal.targetPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="goal-card__footer">
        <span className="goal-card__meta">
          Target: {goal.targetDate}
        </span>
        <span className="goal-card__remaining">
          ${remaining.toLocaleString()} to go
        </span>
      </div>
    </div>
  );
}
