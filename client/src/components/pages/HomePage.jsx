import Layout from "../layout/Layout"
import HomePageGetStarted from "../homePageComponents/HomePageGetStarted"
import RecommendationCardList from "../homePageComponents/RecommendationCardList"
import RecentlyAddedCardList from "../homePageComponents/RecentlyAddedCardList"
import MostPlayedCardList from "../homePageComponents/MostPlayedCardList"

import { Box, Container } from "@mui/material"
import { userContext } from "../context/UserContext"
import { useContext } from "react"


export const Homepage = () => {
    const { user } = useContext(userContext)
    return (
        <Layout>
            <Box display={"flex"} flexDirection={"column"} justifyContent={'flex-start'} alignItems={'center'}>
                <Box marginBottom={'10px'}>
                    {!user && <HomePageGetStarted />}
                    <RecommendationCardList />
                </Box>
                <Box sx={{
                    display: { xs: 'block', sm: 'flex' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <RecentlyAddedCardList />
                    <MostPlayedCardList />
                </Box>
            </Box>
        </Layout>
    )
}