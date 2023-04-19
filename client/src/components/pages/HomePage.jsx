import Layout from "../layout/Layout"
import { useContext } from "react"
import { userContext } from "../context/UserContext"
import HomePageGetStarted from "../cards/HomepageGetStarted"
import RecommendationCard from "../cards/RecommendationCard"
import GameCard from "../cards/GameCard"
import { Box } from "@mui/material"

export const Homepage = () => {

    const {signOutUser} = useContext(userContext)

    return (
        <Layout>
            <Box>
                <HomePageGetStarted />
                <RecommendationCard />
                <GameCard />
            </Box>
        </Layout>
    )
}