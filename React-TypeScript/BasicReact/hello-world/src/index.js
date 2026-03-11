import React from "react";
import ReactDOM from "react-dom/client";

function MyButton() {
  return <button>I'm a button</button>;
}

//define the main component of the file
export default function MyApp() {
  return (
    <div>
      <h1>Hello World from React!</h1>
      <MyButton />
    </div>
  );
}

//get the root div and render our components
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>,
);
