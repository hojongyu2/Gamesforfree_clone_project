import Layout from "../layout/Layout"
import { useContext } from "react"
import { userContext } from "../context/UserContext"

export const Homepage = () => {

    const {signOutUser} = useContext(userContext)

    return (
        <Layout>
            <h1>This is from React HomePage</h1>

        </Layout>
    )
}