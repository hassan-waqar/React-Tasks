import {Route} from "react-router";
import UsersList from "../components/UsersList";
import Admindashboard from "../components/AdminDashboard";
import {Link, Outlet} from "react-router-dom";

const AdminRoutes = () => {
    return (
        <>
            <li>
                <Link to={`/admin/usersList`}> Users List </Link>
            </li>
            <li>
                <Link to={`/admin/admindashboard`}> Admin Dashboard </Link>
            </li>
            <h1>Welcome Admin!!!</h1>
            <Outlet/>
        </>
    );
};

export default AdminRoutes