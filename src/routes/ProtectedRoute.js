// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ userType , component : Component, ...rest }) => {
    const userAuthenticated = useSelector(state => state.auth.userAuthenticated);
    const adminAuthenticated = useSelector(state => state.auth.adminAuthenticated);

    if (userType === "user"  && userAuthenticated) {
        console.log("userAuthenticated component"); // Debug log
        return <Component {...rest} />;
    } if (adminAuthenticated && userType === "admin" ) {
        console.log("adminAuthenticated component"); // Debug log
        return <Component {...rest} />;
    }
        console.log("Redirecting to root"); // Debug log
        return <Navigate to="/" />;

};

export default ProtectedRoute;
