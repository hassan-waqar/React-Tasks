import {
    Outlet,
    Link,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import {useState} from "react";
import {setUserAuthenticated, setAdminAuthenticated} from "../redux/auth";
import {useDispatch, useSelector} from "react-redux";


export async function action() {
    const contact = await createContact();
    return { contact };
}

export async function loader() {
    const contacts = await getContacts();
    return { contacts };
}

export default function Root() {
    const dispatch = useDispatch();
    const userAuthenticated = useSelector(state => state.auth.userAuthenticated);
    const adminAuthenticated = useSelector(state => state.auth.adminAuthenticated);


    return (
        <>
            {!userAuthenticated && !adminAuthenticated && (<section>
                Welcome to the homepage (Root) !!!
                <br/>
                <Link to={`/admin`}>
                    <button onClick={() => {
                        dispatch(setAdminAuthenticated(true));
                    }}>Click Here to Login as Admin !
                    </button>
                </Link>
                <Link to={`/user`}>
                    <button onClick={() => {
                        dispatch(setUserAuthenticated(true));
                    }}>Click Here to Login as User !
                    </button>
                </Link>


            </section>)
            }
            <div id="detail">
                <Outlet/>
            </div>
        </>
    );
};