import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Contact, {
    loader as contactLoader,
} from "./routes/contacts";
import Root, {
    loader as rootLoader,
    action as rootAction,
} from "./routes/root";
import EditContact from "./routes/edit";
import Parent from "./components/Parent";
import Child from "./components/Child";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                path: "contacts/:contactId",
                element: <Contact />,
                loader: contactLoader,
            },
            {
                path: "contacts/:contactId/edit",
                element: <EditContact />,
                loader: contactLoader,
            },
        ],
    },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    //     <RouterProvider router={router} />
    // </React.StrictMode>

    <>
        <Parent render={(data) => <Child data={data} />} />
    </>
);