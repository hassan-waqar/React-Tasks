import React from "react";
import {useState} from "react";

export default function FunctionalCar ({message})  {

    const [state, setState] = useState({
        brand: "Ford",
        model: "Mustang",
        color: "red",
        year: 1964
    })

    const changeColor = () => {
        setState(prevState => ({
            ...prevState,
            color: "blue"
        }));
    }

    return (
        <div>
            <h1>My {state.brand}</h1>
            <p>
                It is a {state.color}
                {state.model}
                from {state.year}.
            </p>
            <p>Received prop: {message}</p> {/* Accessing the prop */}
            <button
                type="button"
                onClick={changeColor}
            >Change color</button>
        </div>
    );
}