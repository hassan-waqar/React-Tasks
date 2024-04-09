import {useEffect, useState} from "react";
import LoginObservable from "./LoginObservable";

function Header() {
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
                <button onClick={() => LoginObservable.notify(false)} >Login</button>
            ) : (
                <button onClick={() => LoginObservable.notify(true)} >Logout</button>
            )}
        </>
    );
}

export default Header;
