import {Link, Outlet} from "react-router-dom";

const UserRoutes = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to={`/user/profile`}> Profile </Link>
                </li>
                <li>
                    <Link to={`/user/userdashboard`}> User Dashboard </Link>
                </li>
            </ul>
            <h1>Welcome User!!!</h1>
            <Outlet/>
        </div>
    );
};

export default UserRoutes;
