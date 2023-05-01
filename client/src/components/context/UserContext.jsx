import { createContext, useEffect, useState } from "react"
import { axiosWithCSRF } from "../../utilities/axiosWithCSRF";


export const userContext = createContext();

export default function UserContextProvider(props){
    
    //children prop is passed as an object destructuring of props.
    const { children } = props;
    const [ user, setUser ] = useState(null)
    const signInUser = (userData) => setUser(userData)
    const signOutUser = () => setUser(undefined)
    // console.log(user)
    // useEffect will call asynchronous function to make an HTTP GET request to get currently sign_in user
    useEffect(()=>{
        const fetchCurrentSignedInUser = async () => {
            try {
                const response = await axiosWithCSRF.get('/user') 
                if (response.data.success === true){
                    signInUser(response.data)
                }
            } catch (e) {
                console.log("error: " + e)
            }
        }
        fetchCurrentSignedInUser()
    },[])

    return (
        <userContext.Provider value={{user, setUser, signInUser, signOutUser }}>
            {children}
        </userContext.Provider>
    )
    
}