import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { getGameList } from '../../utilities/gameDataAxios';
import { Link, Typography } from '@mui/material';
import MostPlayedCard from '../cards/MostPlayedCard';

export default function MostPlayedCardList() {

  const theme = useTheme();

  const [mostPlayedGames, setMostPlayedGames] = useState([])

  useEffect(async ()=> {
    const filterType = {
        sort_by : 'popularity'
    }
    const response = await getGameList(filterType)
    const firstFourGames = response.slice(0, 4)
    setMostPlayedGames(firstFourGames)

  }, [])
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        flexWrap: 'wrap',
      }}
    >
    <Typography variant='h5' sx={{color: theme.palette.primary.extraLight}}>Most Played</Typography>
      {mostPlayedGames.map((data)=>{
        return (
          <Link href={data.id}>
            <MostPlayedCard data={data}/>
          </Link>
        )
      })}
    </Box>
  );
}



