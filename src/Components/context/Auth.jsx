import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const userInfo = localStorage.getItem('userInfo');

    const [user , setUser] = useState(userInfo);

    const login = (user) => {

        setUser(user)

    }

    const logout = () => {
    if(confirm("Are you sure want to logout!")){
        localStorage.removeItem('userInfo');
        setUser(null)
    }
}

    return <AuthContext.Provider value={{
        user,
        login,
        logout
    }}>
        {children}
    </AuthContext.Provider>


}