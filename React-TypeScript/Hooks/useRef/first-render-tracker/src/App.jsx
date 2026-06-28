import { useState } from "react";
import "./App.css";
import { useRef } from "react";
import { useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const firstRender = useRef(true);
  const [message, setMessage] = useState("Mount");

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setMessage("Re-render");
      console.log(message);
    }
  }, [count]);

  return (
    <>
      <h1>{message}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Count is {count}
      </button>
    </>
  );
}

export default App;
