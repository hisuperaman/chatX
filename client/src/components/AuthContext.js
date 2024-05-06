import { createContext, useEffect, useState } from "react";
import LoadingBar from "./common/LoadingBar";

export const AuthContext = createContext();

export function AuthProvider({setIsLoading, children}){
    const [token, setToken] = useState('');

    useEffect(()=>{
        setIsLoading(true);
        const storedToken = localStorage.getItem('chatXtoken');
        setToken(storedToken);
        
        setIsLoading(false);
    }, [])

    function setGlobalToken(newToken){
        setIsLoading(true);
        setToken(newToken);
        localStorage.setItem('chatXtoken', newToken);
        setIsLoading(false);
    }

    function clearGlobalToken(){
        setIsLoading(true);
        setToken(null);
        localStorage.removeItem('chatXtoken');
        setIsLoading(false);
    }

    return (
        <AuthContext.Provider value={{token, setGlobalToken, clearGlobalToken}}>
            {
                (token!='')?
                    (children)
                :
                    <LoadingBar isLoading={true} />
            }
        </AuthContext.Provider>
    )
}