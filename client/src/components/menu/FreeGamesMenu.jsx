import React, { useState } from 'react';

//MUI
import { Menu, MenuItem, Button, Box, Divider, Link, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const FreeGamesMenu = () => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null);
  const [optionValue, setOptionValue] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    console.log(value)
    setAnchorEl(null);
    setOptionValue(value)
  };

  return (
    <Box>
      <Button onClick={handleClick}>
      <Box display="flex" alignItems="center" sx={{ color: theme.palette.primary.extraLight }}>
          Free Games
          <ExpandMoreIcon sx={{ color: theme.palette.primary.extraLight }} />
      </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{sx:{ backgroundColor: theme.palette.primary.light }}}
      >
    <Link href={`/all/${optionValue}`}>
        <MenuItem onClick={() => handleClose('mmorpg')} sx={{ color: theme.palette.primary.extraLight }}>MMORPG</MenuItem>
        <MenuItem onClick={() => handleClose('shooter')} sx={{ color: theme.palette.primary.extraLight }}>Shooter</MenuItem>
        <MenuItem onClick={() => handleClose('moba')} sx={{ color: theme.palette.primary.extraLight }}>MOBA</MenuItem>
        <MenuItem onClick={() => handleClose('anime')} sx={{ color: theme.palette.primary.extraLight }}>Anime</MenuItem>
        <MenuItem onClick={() => handleClose('battle-royale')} sx={{ color: theme.palette.primary.extraLight }}>Battle Royale</MenuItem>
        <MenuItem onClick={() => handleClose('strategy')} sx={{ color: theme.palette.primary.extraLight }}>Strategy</MenuItem>
        <MenuItem onClick={() => handleClose('fantasy')} sx={{ color: theme.palette.primary.extraLight }}>Fantasy</MenuItem>
        <MenuItem onClick={() => handleClose('racing')} sx={{ color: theme.palette.primary.extraLight }}>Racing</MenuItem>
        <MenuItem onClick={() => handleClose('fighting')} sx={{ color: theme.palette.primary.extraLight }}>Fighting</MenuItem>
        <MenuItem onClick={() => handleClose('sports')} sx={{ color: theme.palette.primary.extraLight }}>Sports</MenuItem>
    </Link>
      </Menu>
    </Box>
  );
};


