import NoteContext from "./context/noteContext";
import {useContext, useEffect} from "react";

function About() {

    const value = useContext(NoteContext)

    useEffect(() => {
        value.update()
    }, []);

    return (
        <>
            <p>This is {value.state.name} and my class is {value.state.class} </p>
        </>
    );
}

export default About;
