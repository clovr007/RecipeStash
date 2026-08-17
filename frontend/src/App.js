import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import NotFound from "./pages/NotFound";

import "./App.css";


function App() {

    const { accessToken } = useContext(AuthContext);


    return (

        <BrowserRouter>

            <Routes>

                {/* LOGIN */}

                <Route
                    path="/login"
                    element={
                        accessToken
                            ? <Navigate to="/" />
                            : <Login />
                    }
                />


                {/* REGISTER */}

                <Route
                    path="/register"
                    element={
                        accessToken
                            ? <Navigate to="/" />
                            : <Register />
                    }
                />


                {/* HOME */}

                <Route
                    path="/"
                    element={
                        accessToken
                            ? <Home />
                            : <Navigate to="/login" />
                    }
                />


                {/* RECIPE DETAILS */}

                <Route
                    path="/recipe/:id"
                    element={
                        accessToken
                            ? <RecipeDetail />
                            : <Navigate to="/login" />
                    }
                />


                {/* ANY UNKNOWN URL */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>

    );

}


export default App;