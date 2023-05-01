import { useContext } from "react";
import Layout from "../layout/Layout";
import { gameContext } from "../context/GameContext";
import FavoriteGameCard from "../cards/FavoriteGameCard";
//mui
import { Box, Typography, useTheme } from "@mui/material";
import CollectionsIcon from '@mui/icons-material/Collections';

export default function MyFavoriteGamesPage () {

    const { myFavGameList } = useContext(gameContext)
    const theme = useTheme()

    return (
        <Layout>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',  gap: 2, margin:'10px', color: theme.palette.primary.extraLight }}>
                    <CollectionsIcon />
                    <Typography variant="h5">My Favorite Game List</Typography>
                </Box>
                {myFavGameList.map((game) => {
                    return (
                        <Box>
                            <FavoriteGameCard  data={game} />
                        </Box>
                    )
                })}
            </Box>
        </Layout>
    )
}

