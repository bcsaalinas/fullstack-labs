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

  return (
    <>
      <h1>To Do List</h1>
      <input
        onChange={handleFormSubmit}
        type="text"
        placeholder="Add your next task "
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            pushTask();
          }
        }}
        value={inputText}
      />
      <span>
        <button onClick={pushTask}> Add task</button>
      </span>

      <ul>
        {tasks.map((task, index) => {
          return (
            <Task key={index} id={index} text={task} onCheck={deleteTask} />
          );
        })}
      </ul>
    </>
  );
}

export default App;
