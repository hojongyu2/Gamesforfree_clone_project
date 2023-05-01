import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { useState, useEffect } from "react";
import { getRandomThree } from "../../utilities/gameDataAxios";
import RecommendationCards from "../cards/RecommendationCards";
import { Typography } from "@mui/material";
import { userContext } from "../context/UserContext";
import { useContext } from "react";

export default function RecommendationCardList() {

  const [randomGameData, setRandomGameData] = useState([]);
  const { user } = useContext(userContext)

  const message = () => {
    if (user) {
      return `Recommendations for ${user.user.email}`
    } else {
      return 'Sign up to track what you have played and search for what to play next!'
    }
  }

  const theme = useTheme();

  useEffect(async () => {
    const response = await getRandomThree();
    setRandomGameData(response);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop:'20px'
      }}
    >
      <Box>
        <Box sx={{color: theme.palette.primary.extraLight, display: 'flex', flexDirection: 'row', alignItems:'center', gap: 1}}>
          <SmartToyIcon sx={{ marginBottom:'10px' }} />
          <Typography variant="h5" sx={{ marginBottom:'10px' }}>{message()}</Typography>
        </Box>
        <Box sx={{color: theme.palette.secondary.main, display: 'flex', flexDirection: 'row', alignItems:'center', gap: 1}}>
          <VideogameAssetIcon sx={{marginBottom:'10px' }}/>
          <Typography variant="body2" sx={{marginBottom:'10px' }}>Refresh for more awesome recommendations!</Typography>
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
          borderRadius:'10px'
        }}>
          {randomGameData.map((data) => {
            return <RecommendationCards data={data} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}
