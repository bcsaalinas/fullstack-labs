import { useState } from "react";

import "./App.css";
import { useRef } from "react";

function App() {
  const startRef = useRef(null); // when our timer actually starts
  const [elapsed, setElapsed] = useState(0.0); // how much seconds have passed
  const timerId = useRef(null); // id of the interval
  const [stopped, setStopped] = useState(false);
  const acumulatedRef = useRef(null);

  function handleStart() {
    //clear the last timer
    clearInterval(timerId.current);

    //if the timer is stopped, resume from last checkpoint saved in acumulatedRef, otherwise start from 0
    if (timerId.current && stopped !== false) {
      //resume
      startRef.current = Date.now() - acumulatedRef.current * 1000; //x1000 to match ms
      acumulatedRef.current = 0; //refresh for new start
    } else {
      //by resetting the startRef to Date.now(), we are starting from 0
      startRef.current = Date.now();
    }

    setStopped(false);
    timerId.current = setInterval(() => {
      setElapsed(((Date.now() - startRef.current) / 1000).toFixed(2));
    }, 100);
  }

  function handleStop() {
    if (timerId.current) {
      acumulatedRef.current = Number(elapsed); //saves elapsed
      clearInterval(timerId.current);
      setStopped(true);
      console.log(`checkpoint is ${acumulatedRef.current}`);
    } else {
      //if no timer has started and you click stop, do nothing
      return;
    }
  }

  function clear() {
    clearInterval(timerId.current);
    setElapsed(0.0);
    acumulatedRef.current = 0;
    startRef.current = 0;
  }

  return (
    <>
      <h1>Stopwatch</h1>
      <h2>{elapsed}</h2>
      <div className="button-container">
        <button onClick={handleStart}>{stopped ? "Resume" : "Start"}</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={clear}>Clear</button>
      </div>
    </>
  );
}

export default App;
