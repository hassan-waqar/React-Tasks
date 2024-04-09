import {useEffect, useState} from "react";
import LoginObservable from "./LoginObservable";

function Body() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = (value) => {
        setIsLoggedIn(value)
    }

    useEffect(() => {
        LoginObservable.subscribe(handleLogin);

        return () => {
            LoginObservable.unsubscribe(handleLogin);
        };
    }, [LoginObservable]);

    return (
        <>
            {isLoggedIn ? (
                <p>Welcome To the Website !</p>
            ) : (
                <p>Please Login !</p>
            )}
        </>
    );
}

export default Body;
