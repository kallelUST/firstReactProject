import { createContext, useState, useEffect } from "react";
import axios from 'axios';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

    
    useEffect(() => {
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        } else {
          localStorage.removeItem("accessToken");
        }
      }, [accessToken])



    return (
        <AuthContext.Provider value={{accessToken, setAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;