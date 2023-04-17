import { Button } from "@mui/material"
import { userLogout } from "../../utilities/userAuthAxios"
import Layout from "../layout/Layout"
import { useNavigate } from "react-router-dom"

export const Homepage = () => {
    const navigate = useNavigate()
    const tempLogoutButton = async () => {
        const response = await userLogout()
        if (response === true){
            navigate('/')
        }
    }

    return (
        <Layout>
            <h1>This is from React HomePage</h1>
            <Button onClick={tempLogoutButton}>logout</Button>
        </Layout>
    )
}