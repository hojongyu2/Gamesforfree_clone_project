import { createContext, useEffect, useState } from "react"

export const userContext = createContext();

export default function UserContextProvider(props){
    //children prop is passed as an object destructuring of props.
    const { children } = props;
    const [ user, setUser ] = useState(null)
    const signInUser = (userData) => setUser(userData)
    const signOutUser = () => setUser(undefined)
    console.log(user)
    return (
        <userContext.Provider value={{user, setUser, signInUser, signOutUser }}>
            {children}
        </userContext.Provider>
    )
    
}