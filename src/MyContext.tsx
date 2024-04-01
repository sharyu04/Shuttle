import React, { createContext } from "react";
import { userDetails } from "./interfaces/interfaces";

export interface IContext {
    bearerToken: string;
    handleSetToken: (token: string) => void;
    user: userDetails | null;
    handleSetUser: (user: userDetails) => void;
}
export const MyContext = createContext<IContext | null>(null)
const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bearerToken, setBearerToken] = React.useState<string>("")
    const [user, setUser] = React.useState<userDetails | null>(null)
    const handleSetToken = (token: string) => {
        setBearerToken(token)
        // console.log("bearerTokenSet")
    }
    const handleSetUser = (user: userDetails) => {
            setUser(user)
            // console.log("user set")
        }
    return <MyContext.Provider value={{bearerToken, handleSetToken, user, handleSetUser }}>{children}</MyContext.Provider>
}
export default MyContextProvider;
