import { auth } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    updatePassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // add user to firestore
};

const clearCookies = () => {
    // Get all cookies
    const cookies = document.cookie.split(';');

    // Loop through cookies and clear each one
    cookies.forEach((cookie) => {
        const cookieParts = cookie.split('=');
        const cookieName = cookieParts[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
};
export const doSignOut = () => {
    return new Promise((resolve, reject) => {
        // Sign out the user using Firebase Authentication
        signOut(auth)
            .then(() => {
                // Clear cookies
                clearCookies();
                resolve();
            })
            .catch((error) => {
                console.error('Error signing out:', error);
                reject(error);
            });
    });
};

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
};
