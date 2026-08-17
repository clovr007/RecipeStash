import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";


function Login() {

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();


    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        try {

            await login(
                username,
                password
            );

            navigate("/");


        } catch (error) {

            console.log(error);

            setError(
                "Invalid username or password"
            );

        }

    };


    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1>
                    🍳 Recipe Stash
                </h1>

                <h2>
                    Welcome back
                </h2>


                <form onSubmit={handleSubmit}>

                    <label>
                        Username
                    </label>

                    <input
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}


                    <button type="submit">
                        Login
                    </button>

                </form>


                <p>

                    Don't have an account?

                    {" "}

                    <Link to="/register">
                        Create one
                    </Link>

                </p>

            </div>

        </div>

    );

}


export default Login;