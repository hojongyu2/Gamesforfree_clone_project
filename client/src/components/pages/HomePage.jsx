import Layout from "../layout/Layout"
import HomePageGetStarted from "../cards/HomepageGetStarted"
import RecommendationCards from "../cards/RecommendationCards"
import { Box } from "@mui/material"


export const Homepage = () => {

    return (
        <Layout>
            <Box>
                <HomePageGetStarted />
                <RecommendationCards />
            </Box>
        </Layout>
    )
}