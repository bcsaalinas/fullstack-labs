import { useState } from "react";
import Task from "./Task";

function App() {
  const [inputText, setInputText] = useState("");
  //tasks is going to be an array of strings
  const [tasks, setTasks] = useState<string[]>([]);

  //get the text from the input
  function handleFormSubmit(e: any) {
    e.preventDefault();
    const value = e.target.value;
    setInputText(value);
  }

  //push the events value to the tasks array
  function pushTask() {
    if (!inputText.trim()) return;

    setTasks((prevTask) => {
      return [...prevTask, inputText];
    });
    setInputText("");
  }

  function deleteTask(id: number) {
    //use the set function from state to update the tasks array by filtering out the task with the given id
    setTasks((prevTasks) => {
      return prevTasks.filter((_, index) => {
        return id !== index;
      });
    });
  }

  const encouragements = [
    "you've got this ✦",
    "one step at a time ✦",
    "make it happen ✦",
    "stay focused ✦",
    "you can make it happenn ✦",
  ];
  const phrase = encouragements[tasks.length % encouragements.length];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          my list
          {tasks.length > 0 && (
            <span className="task-count">{tasks.length}</span>
          )}
        </h1>
        <p className="app-subtitle">tap a task to delete it when done</p>
      </header>

      <div className="input-area">
        <input
          className="task-input"
          onChange={handleFormSubmit}
          type="text"
          placeholder="what's next for you?"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              pushTask();
            }
          }}
          value={inputText}
          autoFocus
        />
        <button
          className="add-btn"
          onClick={pushTask}
          disabled={!inputText.trim()}
          title="Add task"
          aria-label="Add task"
        >
          +
        </button>
      </div>

      {tasks.length > 0 && <div className="divider" />}

      <ul className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">✎</span>
            <p>nothing here yet — start writing!</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <Task key={index} id={index} text={task} onCheck={deleteTask} />
          ))
        )}
      </ul>

      {tasks.length > 0 && <p className="encouragement">{phrase}</p>}
    </div>
  );
}
export default App;
