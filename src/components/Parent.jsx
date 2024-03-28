import React from "react";

export default function Parent({ render }) {
    // Call the render prop function and pass any necessary data
    return (
        <>
            <h1>Parent Component</h1>
            {render("Hello from Parent Component")}
        </>
    );
}
