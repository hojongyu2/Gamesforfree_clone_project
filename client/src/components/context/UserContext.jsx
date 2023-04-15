import { createContext, useEffect, useState } from "react"

export const userContext = createContext();

export default function UserContextProvider(props){
    //children prop is passed as an object destructuring of props.
    const { children } = props;
    const [ user, setUser ] = useState("hj")

    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
    
}