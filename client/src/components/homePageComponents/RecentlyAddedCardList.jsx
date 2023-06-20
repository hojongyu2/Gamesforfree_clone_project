import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { getGameList } from '../../utilities/gameDataAxios';
import { Button, Link, Typography } from '@mui/material';
import RecentlyAddedCard from '../cards/RecentlyAddedCard';

export default function RecentlyAddedCardList() {
  const theme = useTheme();

  const [resentlyAddedGames, setRecentlyAddedGames] = useState([])

  useEffect(async () => {
    const filterType = {
      sort_by: 'release-date'
    }
    const response = await getGameList(filterType)
    const slicedGames = response.slice(0, 9)
    setRecentlyAddedGames(slicedGames)
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      }}
    >
      <Typography variant='h5' sx={{ color: theme.palette.primary.extraLight }} >Recently Added</Typography>
      {resentlyAddedGames.map((data) => {
        return (
          <Link href={data.id} sx={{ textDecoration: 'none' }}>
            <RecentlyAddedCard data={data} />
          </Link>
        )
      })}
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        marginTop: '20px',
        marginBottom: '20px',
      }}>
        <Link href={'/all/mmorpg'}>
          <Button sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.extraLight }}>More Games</Button>
        </Link>
      </Box>
    </Box>
  );
}



