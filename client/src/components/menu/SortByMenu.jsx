import * as React from 'react';
import { useState } from 'react';
//MUI
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Link, Typography, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from 'react-router-dom';

// allows me to get query from url
// query is a key-value pairs that follow the question mark (?) in the URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SortByMenu({urlPlatform, urlCategory}) {
  const theme = useTheme()
  const [menuItemValue, setMenuItemValue]= useState("all")

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const query = useQuery();
  const sort_by = query.get('sort_by') || 'relevance' // if there are no sort_by query then set a default value as relevance

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (menuItemValue) => {
    setAnchorEl(null);
    setMenuItemValue(menuItemValue)
  };

  return (
    <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
      <Typography sx={{color: theme.palette.primary.extraLight}}>Sort By: </Typography>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size='small'
        sx={{color:'white'}}
      >
        {sort_by}
        <ExpandMoreIcon sx={{color: theme.palette.secondary.main}}/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{sx:{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.extraLight  }}}
      >
        <Link href={`/${urlPlatform}/${urlCategory}?sort_by=${menuItemValue}`}>
          <MenuItem disabled sx={{ color: theme.palette.primary.extraLight }}>Sort By:</MenuItem>
          <MenuItem onClick={()=>handleClose('relevance')} sx={{ color: theme.palette.primary.extraLight }}>Relevance</MenuItem>
          <MenuItem onClick={()=>handleClose('popularity')} sx={{ color: theme.palette.primary.extraLight }}>Popularity</MenuItem>
          <MenuItem onClick={()=>handleClose('release-date')} sx={{ color: theme.palette.primary.extraLight }}>Release Date</MenuItem>
          <MenuItem onClick={()=>handleClose('alphabetical')} sx={{ color: theme.palette.primary.extraLight }}>Alphabetical</MenuItem>
        </Link>
      </Menu>
    </Box>
  );
}
