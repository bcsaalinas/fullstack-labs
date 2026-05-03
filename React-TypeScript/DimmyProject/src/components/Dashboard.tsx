import { useState } from "react";
import type { Goal } from "../types/Goal";
import type { NewGoalData } from "../types/NewGoalData";
import Form from "./Form";
import "./Dashboard.css";

export default function Dashboard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function addGoal(goal: NewGoalData) {
    const newGoal: Goal = {
      id: crypto.randomUUID(),
      name: goal.name,
      targetPrice: goal.targetPrice,
      targetDate: goal.targetDate,
      amountSaved: goal.amountSaved,
    };

    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
  }

  function triggerForm() {
    setIsFormOpen(true);
  }

  return (
    <div className="dashboard">
      <div className="dashboard__inner">
        <div className="dashboard__header">
          <h1 className="dashboard__title">My Goals</h1>
          <button onClick={triggerForm} className="btn btn--primary btn--sm">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1v10M1 6h10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            Add a goal
          </button>
        </div>

        {goals.length === 0 && (
          <div className="dashboard__empty">
            <div className="dashboard__empty-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle
                  cx="9"
                  cy="9"
                  r="7.5"
                  stroke="#C4876B"
                  strokeWidth="1.5"
                />
                <path
                  d="M9 5.5v5.5M6.5 8.5H12"
                  stroke="#C4876B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="dashboard__empty-title">
              Start with your first goal
            </h2>
            <p className="dashboard__empty-copy">
              Set a target, a date, and how much you've already saved.
            </p>
          </div>
        )}

        {isFormOpen && <Form onAddGoal={addGoal} />}
      </div>
    </div>
  );
}
