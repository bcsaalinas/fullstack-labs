import { useState } from "react";
import type { NewGoalData } from "../types/NewGoalData";
import "./Form.css";

type FormProps = {
  onAddGoal: (goal: NewGoalData) => void;
};

export default function Form({ onAddGoal }: FormProps) {
  //
  const [currentGoal, setCurrentGoal] = useState({
    name: "",
    targetPrice: "",
    targetDate: "",
    amountSaved: "",
  });
  void onAddGoal;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const eventName = e.currentTarget.name as keyof NewGoalData;
    const eventValue = e.currentTarget.value;
    //build the goal object

    if (eventName == "targetPrice" || eventName === "amountSaved") {
      setCurrentGoal((prev) => {
        return {
          ...prev,
          [eventName]: Number(eventValue),
        };
      });
    } else {
      setCurrentGoal((prev) => {
        return {
          ...prev,
          [eventName]: eventValue,
        };
      });
    }

    console.log(currentGoal);
  }

  return (
    <form className="goal-form" action="#">
      <h3 className="goal-form__title">New goal</h3>

      <div>
        <label className="field-label">Goal name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="e.g. New MacBook"
          className="field-input"
        />
      </div>

      <div>
        <label className="field-label">Target price</label>
        <input
          type="text"
          name="targetPrice"
          onChange={handleChange}
          placeholder="e.g. 1299"
          className="field-input"
        />
      </div>

      <div>
        <label className="field-label">Target date</label>
        <input
          type="date"
          name="targetDate"
          onChange={handleChange}
          placeholder=""
        />
      </div>

      <button
        type="submit"
        className="btn btn--primary btn--sm goal-form__submit"
      >
        Save goal
      </button>
    </form>
  );
}
