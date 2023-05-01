import { Box } from "@mui/material"
import Layout from "../layout/Layout"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const SpecialOffersPage = () => {
    const navivate = useNavigate()
    
    useEffect(()=>{
        setTimeout(() => {
            navivate('/')
        }, 2000);
    },[])

    return (
        <Layout>
            <Box sx={{
        width:'100vw',
        height:'80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage:
        "linear-gradient(rgb(60, 60, 60), rgba(0, 0, 0, 0.1)), url('https://media.istockphoto.com/id/1332167985/photo/coming-soon-neon-sign-the-banner-shining-light-signboard-collection.jpg?b=1&s=170667a&w=0&k=20&c=Le4B-lJt-jXjeAOdlTQptNvN_DmRwWF19ShNc5VY4a4=')",
      }}>
            </Box>
        </Layout>
    )
}
