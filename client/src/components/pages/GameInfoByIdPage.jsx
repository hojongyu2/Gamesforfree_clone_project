import Layout from "../layout/Layout"
import { useContext, useEffect } from "react"
import { gameContext } from "../context/GameContext"
import { getGameDetailById } from "../../utilities/gameDataAxios"
import GameCardWithRatings from "../cards/GameCardWithRatings"

//Mui
import { Box } from "@mui/material"
import GameCardWithReviews from "../cards/GameCardWithReviews"

export default function GameInfoByIdPage() {
    const { gameDataById, setGameDataById, backgroundImage } = useContext(gameContext)
    const urlPath = window.location.pathname; // access to the url path
    const value = urlPath.substring(1); // get a value from query paramet

    useEffect(async () => {
        const response = await getGameDetailById(value)
        setGameDataById([response])
    }, [])

    return (
        <Layout>
            <Box
                sx={{
                    height: '100%',
                    position: 'relative',
                    backgroundSize: 'cover',
                    backgroundImage:
                        `linear-gradient(to bottom, rgba(60, 60, 60, 0.8), rgba(39, 43, 48, 1)), url(${backgroundImage})`,
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' }, // column on small screens, row on larger
                    justifyContent: 'center',
                    gap: 5,
                }}>
                    <Box>
                        {gameDataById.map((data, index) => {
                            return (
                                <GameCardWithRatings data={data} />
                            )
                        })}
                    </Box>
                    {gameDataById.map((data, index) => {
                        return (
                            <GameCardWithReviews data={data} />
                        )
                    })}
                </Box>
            </Box>
        </Layout>
    )
}

