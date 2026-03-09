import React from "react";
import ReactDOM from "react-dom/client";

let date = new Date();
let currentYear = date.getFullYear();

export default function MyApp() {
  return (
    <div>
      <p>Created by bcsaalinas</p>
      <p>Copyright {currentYear}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyApp />);
