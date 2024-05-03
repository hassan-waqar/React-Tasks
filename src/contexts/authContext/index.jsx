import React, {useState, useEffect, useContext} from "react";
import {auth} from "../../firebase/firebase"
import {onAuthStateChanged} from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider ({children}) {
    const [currentUser, setCurrectUser] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUSer)
    }, []);

    async function initializeUSer(user) {
        if(user) {
            setCurrectUser({...user});
            setUserLoggedIn(true)
        }else {
            setCurrectUser(null);
            setUserLoggedIn(false)
        }
        setLoading(false)
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}