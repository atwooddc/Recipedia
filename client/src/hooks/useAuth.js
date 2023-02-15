// This custom hook allows us to avoid repeating the steps below everytime we need to get the auth context in our application

import { useContext } from "react";
import AuthContext from '../context/AuthProvider'

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;