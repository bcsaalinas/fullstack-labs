import { useEffect, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`count is ${count}`);
    document.title = count.toString();
  }, [count]);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    if (count <= 0) return;

    setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <div>
      <h1>See the title change with the counter!!</h1>

      <div className="button-container">
        <div className="button-row">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
        </div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
