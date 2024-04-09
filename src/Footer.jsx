import {useEffect, useState} from "react";
import LoginObservable from "./LoginObservable";

function Footer() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = (value) => {
        setIsLoggedIn(value)
    }

    useEffect(() => {
        LoginObservable.subscribe(handleLogin);
        return () => {
            LoginObservable.unsubscribe(handleLogin)
        }
    }, [LoginObservable]);

    return (
        <>
            {isLoggedIn ? (
                <p>Footer Logged In</p>
            ) : (
                <p>Footer Logged Out</p>
            )}
        </>
    );
}

export default Footer;
