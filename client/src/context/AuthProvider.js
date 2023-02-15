import { createContext, useState } from "react";

// Right now let's make the auth information really simple and keep it as whether or not they are logged in as a boolean value
const AuthContext = createContext(false)

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(false)

    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext