import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async(inputs)=>{
        const res = await axios.post("https://my-sql-deployment-027007fd602b.herokuapp.com/api/auth/login", inputs);
        setCurrentUser(res.data);
    };

    const logout = async(inputs)=>{
        const res = await axios.post("https://my-sql-deployment-027007fd602b.herokuapp.com/api/auth/logout");
        setCurrentUser(null);
    };

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};