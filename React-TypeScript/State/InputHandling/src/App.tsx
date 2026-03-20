import { useState } from "react";
import "./App.css";
import ethereumLogo from "./assets/ethereum-logo-svgrepo-com.svg";

export default function App() {
  const [fullname, setFullName] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  function changeInput(e: any) {
    //getting the name form the form and the value, only the cu
    const eventName = e.target.name;
    const eventValue = e.target.value;

    console.log(eventName);

    //we want to update only key that changed, and leave the other keys values as they were before

    //prev is our previous state react passes into the updater when its about to calculate the next one
    setFullName((prev) => {
      //this copies the previous state and then updates only the key that changed with the new value, this way we dont lose the other keys values
      const newState = {
        ...prev,
        [eventName]: eventValue,
      };

      return newState;
    });
  }

  return (
    <div className="form-container">
      <div className="card">
        <img src={ethereumLogo} width={"100px"} alt="Etherium logo " />
        <form action="#">
          <h1>
            Hello Again!{fullname.firstName} {fullname.lastName}{" "}
          </h1>
          <p>{fullname.email}</p>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            onChange={changeInput}
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            onChange={changeInput}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeInput}
          />
        </form>
      </div>
    </div>
  );
}
