
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import logger from 'redux-logger'; // Import Redux Logger middleware
import authReducer from "./redux/auth"; // Assuming you have your auth reducer in a file named auth.js
import "./index.css";
import Root, { loader as rootLoader, action as rootAction } from "./routes/root";
import ErrorPage from "./error-page";
import Profile from "./components/Profile";
import Userdashboard from "./components/UserDashboard";
import Admindashboard from "./components/AdminDashboard";
import UsersList from "./components/UsersList";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,

    },
    {
        path: "/user",
        element: <UserRoutes />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/user/profile",
                element:
                    <ProtectedRoute userType="user" component={Profile} />

            },
            {
                path: "/user/userdashboard",
                element: (
                    <ProtectedRoute userType="user" component={Userdashboard} />
                ),
            },
        ],

    },
    {
        path: "/admin",
        element: <AdminRoutes />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/admin/userslist",
                element:
                    <ProtectedRoute userType="admin" component={UsersList} />

            },
            {
                path: "/admin/admindashboard",
                element: (
                    <ProtectedRoute userType="admin" component={Admindashboard} />
                ),
            },
        ],

    },

]);


// Manually create middleware array
const middleware = [logger]; // Include Redux Logger middleware or any other middleware you want to use

// Create Redux store with middleware
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>

);
