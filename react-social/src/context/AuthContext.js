import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: { 
    _id: "64d78a861f253a23230b1e17", 
    username: "jane", 
    email: "jane@gmail.com", 
    profilePicture: "person/1.jpeg", 
    coverPicture: "", 
    followers: [], 
    followings: [], 
    },
    isFetching: false,
    error: false
};

// creating context
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching
                , error: state.error,
                dispatch
            }}>
            {children}
        </AuthContext.Provider>
    );

};