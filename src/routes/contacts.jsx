import { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

export async function loader({ params }) {
    const contact = await getContact(params.contactId);
    return { contact };
}


export default function Contact() {
    const { contact } = useLoaderData();
    // const contact = {
    //     first: "Your",
    //     last: "Name",
    //     avatar: "https://placekitten.com/g/200/200",
    //     twitter: "your_handle",
    //     notes: "Some notes",
    //     favorite: true,
    // };

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleDelete = () => {
        // Perform delete action here
        setShowDeleteConfirmation(false); // Close the confirmation dialog
    };

    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || null}
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <button onClick={() => setShowDeleteConfirmation(true)}>Delete</button>
                </div>

                {showDeleteConfirmation && (
                    <div>
                        <p>Are you sure you want to delete this contact?</p>
                        <button onClick={handleDelete}>Yes</button>
                        <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
                    </div>
                )}
            </div>
        </div>
    );
}

function Favorite({ contact }) {
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    return (
        <Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
}
