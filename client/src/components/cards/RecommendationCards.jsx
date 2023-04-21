import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import GameCard from './GameCard';
import { useState, useEffect } from 'react';
import { getRandomThree } from '../../utilities/gameDataAxios';

export default function RecommendationCard() {
  const theme = useTheme();
  const isXxs = useMediaQuery(theme.breakpoints.between('xxs', 'xs')); // Add this line
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const paperWidth = isXxs ? 280 : isXs ? 300 : isSm ? 300 : 300 
  const paperHeight = isXxs ? 200 : isXs ? 220 : isSm ? 250 : 250 

  const [randomGameData, setRandomGameData] = useState([])
  useEffect(async ()=> {
    setRandomGameData(await getRandomThree())
  }, [])
  console.log(randomGameData)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: paperWidth,
          height: paperHeight,
        },
      }}
    >
      {randomGameData.map((data, index)=>{
        return (
          <GameCard data={data}/>
        )
      })}
    </Box>
  );
}
