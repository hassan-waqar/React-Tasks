import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const initialValue = {
        name: "Hassan",
        class: "8A"
    };

    const update = () => {
        setTimeout(() => {
            setState({
                name: "Hassan Waqar",
                class: "Graduate"
            });
        }, 2000);
    };

    const [state, setState] = useState(initialValue);

    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
