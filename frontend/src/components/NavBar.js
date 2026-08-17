import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";


function NavBar() {

    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    return (

        <nav className="navbar">

            <Link
                to="/"
                className="logo"
            >
                🍳 Recipe Stash
            </Link>


            <div className="nav-links">

                <Link to="/">
                    My Recipes
                </Link>


                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </nav>

    );

}


export default NavBar;