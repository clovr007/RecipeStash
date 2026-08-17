import { createContext, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("accessToken")
    );

    const login = async (username, password) => {

        const response = await api.post(
            "token/",
            {
                username: username,
                password: password
            }
        );

        const token = response.data.access;

        localStorage.setItem(
            "accessToken",
            token
        );

        setAccessToken(token);
    };

    const logout = () => {

        localStorage.removeItem("accessToken");

        setAccessToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}