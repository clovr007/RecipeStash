import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";


function Register() {

    const navigate = useNavigate();


    const [form, setForm] = useState({
        username: "",
        password: ""
    });


    const [error, setError] = useState("");

    const [message, setMessage] = useState("");


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setMessage("");


        try {

            await api.post(
                "register/",
                form
            );


            setMessage(
                "Account created successfully!"
            );


            setTimeout(() => {

                navigate("/login");

            }, 1000);


        } catch (error) {

            console.log(error);

            setError(
                "Could not create account."
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
                    Create an account
                </h2>


                <form onSubmit={handleSubmit}>

                    <label>
                        Username
                    </label>

                    <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />


                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}


                    {message && (
                        <p>
                            {message}
                        </p>
                    )}


                    <button type="submit">
                        Create Account
                    </button>

                </form>


                <p>

                    Already have an account?

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}


export default Register;