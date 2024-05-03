import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDashboard from "./Views/UserDashboard";
import Profile from "./components/Profile";
import ErrorPage from "./Views/ErrorPage";
import ProtectedRoute from "./Route/ProtectedRoute";
import Cart from "./components/Cart";
import AdminLogin from "./Views/AdminLogin";
import UserLogin from "./Views/UserLogin";
import Root from "./Views/Root";
import AdminDashboard from "./Views/AdminDashboard";
import AdminOrders from "./components/AdminOrders";
import UserOrders from "./components/UserOrders";
import AdminProducts  from "./components/AdminProducts";
import { Provider } from "react-redux";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import logger from 'redux-logger'; // Import Redux Logger middleware
import authReducer from "./redux/auth";
import UserSignup from "./Views/UserSignup";
import UserProducts from "./components/UserProducts";
import IndividualProduct from "./components/IndividualProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,

    },
    {
        path: "/admin-login",
        element: <AdminLogin/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/user-signup",
        element: <UserSignup/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/user-login",
        element: <UserLogin/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/user",
        element: <ProtectedRoute userType="user" component={UserDashboard} />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/user",
                element:
                    <ProtectedRoute userType="user" component={UserProducts} />

            },
            {
                path: "/user/product/:id",
                element:
                    <ProtectedRoute userType="user" component={IndividualProduct}/>
            },
            {
                path: "/user/profile",
                element:
                    <ProtectedRoute userType="user" component={Profile} />

            },
            {
                path: "/user/cart",
                element: (
                    <ProtectedRoute userType="user" component={Cart} />
                ),
            },
            {
                path: "/user/orders",
                element: (
                    <ProtectedRoute userType="user" component={UserOrders} />
                ),
            },
        ],

    },
    {
        path: "/admin",
        element : <ProtectedRoute userType="admin" component={AdminDashboard} />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/admin/profile",
                element:
                    <ProtectedRoute userType="admin" component={Profile} />

            },
            {
                path: "/admin/products",
                element: (
                    <ProtectedRoute userType="admin" component={AdminProducts} />
                ),
            },
            {
                path: "/admin/orders",
                element: (
                    <ProtectedRoute userType="admin" component={AdminOrders} />
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

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
    </React.StrictMode>,
);

