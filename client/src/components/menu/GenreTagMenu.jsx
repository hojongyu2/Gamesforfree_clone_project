import * as React from 'react';
import { useState } from 'react';
//MUI
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Link, Typography, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';

export default function GenreTagMenu({urlPlatform}) {
  const theme = useTheme()
  const [menuItemValue, setMenuItemValue]= useState("mmo")
  const {category} = useParams()
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (itemValue) => {
    setAnchorEl(null);
    setMenuItemValue(itemValue)
  };

  return (
    <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
      <Typography sx={{color: theme.palette.primary.extraLight}}>Genre/Tag: </Typography>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size='small'
        sx={{color:'white'}}
      >
        {category}
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
        PaperProps={{sx:{ backgroundColor: theme.palette.primary.light, height:'20vh'}}}
      >
        <Link href={`/${urlPlatform}/${menuItemValue}`}>
          <MenuItem disabled sx={{ color: theme.palette.primary.extraLight }} >Browse By Genre:</MenuItem>
          <MenuItem onClick={()=>handleClose('mmo')} sx={{ color: theme.palette.primary.extraLight }}>MMO</MenuItem>
          <MenuItem onClick={()=>handleClose('mmorpg')} sx={{ color: theme.palette.primary.extraLight }}>MMORPG</MenuItem>
          <MenuItem onClick={()=>handleClose('shooter')} sx={{ color: theme.palette.primary.extraLight }}>Shooter</MenuItem>
          <MenuItem onClick={()=>handleClose('strategy')} sx={{ color: theme.palette.primary.extraLight }}>Strategy</MenuItem>
          <MenuItem onClick={()=>handleClose('moba')} sx={{ color: theme.palette.primary.extraLight }}>Moba</MenuItem>
          <MenuItem onClick={()=>handleClose('card')} sx={{ color: theme.palette.primary.extraLight }}>Card Games</MenuItem>
          <MenuItem onClick={()=>handleClose('racing')} sx={{ color: theme.palette.primary.extraLight }}>Racing</MenuItem>
          <MenuItem onClick={()=>handleClose('sports')} sx={{ color: theme.palette.primary.extraLight }}>Sports</MenuItem>
          <MenuItem onClick={()=>handleClose('social')} sx={{ color: theme.palette.primary.extraLight }}>Social</MenuItem>
          <MenuItem onClick={()=>handleClose('fighting')} sx={{ color: theme.palette.primary.extraLight }}>Fighting</MenuItem>
          <MenuItem disabled sx={{ color: theme.palette.primary.extraLight }}>Popular Tags:</MenuItem>
          <MenuItem onClick={()=>handleClose('mmofps')} sx={{ color: theme.palette.primary.extraLight }}>MMOFPS</MenuItem>
          <MenuItem onClick={()=>handleClose('action-rpg')} sx={{ color: theme.palette.primary.extraLight }}>Action RPG</MenuItem>
          <MenuItem onClick={()=>handleClose('sandbox')} sx={{ color: theme.palette.primary.extraLight }}>Sandbox</MenuItem>
          <MenuItem onClick={()=>handleClose('open-world')} sx={{ color: theme.palette.primary.extraLight }}>Open World</MenuItem>
          <MenuItem onClick={()=>handleClose('survival')} sx={{ color: theme.palette.primary.extraLight }}>Survival</MenuItem>
          <MenuItem onClick={()=>handleClose('battle-royal')} sx={{ color: theme.palette.primary.extraLight }}>Battle Royal</MenuItem>
          <MenuItem onClick={()=>handleClose('mmotps')} sx={{ color: theme.palette.primary.extraLight }}>MMOTPS</MenuItem>
          <MenuItem onClick={()=>handleClose('anime')} sx={{ color: theme.palette.primary.extraLight }}>Anime</MenuItem>
          <MenuItem onClick={()=>handleClose('pvp')} sx={{ color: theme.palette.primary.extraLight }}>PvP</MenuItem>
          <MenuItem onClick={()=>handleClose('pve')} sx={{ color: theme.palette.primary.extraLight }}>PvE</MenuItem>
          <MenuItem onClick={()=>handleClose('mmorts')} sx={{ color: theme.palette.primary.extraLight }}>MMORTS</MenuItem>
          <MenuItem onClick={()=>handleClose('fantasy')} sx={{ color: theme.palette.primary.extraLight }}>Fantasy</MenuItem>
          <MenuItem onClick={()=>handleClose('sci-fi')} sx={{ color: theme.palette.primary.extraLight }}>Sci-Fi</MenuItem>
          <MenuItem onClick={()=>handleClose('action')} sx={{ color: theme.palette.primary.extraLight }}>Action</MenuItem>
          <MenuItem onClick={()=>handleClose('voxel')} sx={{ color: theme.palette.primary.extraLight }}>Voxel</MenuItem>
          <MenuItem onClick={()=>handleClose('turn-based')} sx={{ color: theme.palette.primary.extraLight }}>Turn-Based</MenuItem>
          <MenuItem onClick={()=>handleClose('first-person-view')} sx={{ color: theme.palette.primary.extraLight }}>First Person View</MenuItem>
          <MenuItem onClick={()=>handleClose('thrid-person-view')} sx={{ color: theme.palette.primary.extraLight }}>Thrid Person View</MenuItem>
          <MenuItem onClick={()=>handleClose('3d-graphics')} sx={{ color: theme.palette.primary.extraLight }}>3D Graphics</MenuItem>
          <MenuItem onClick={()=>handleClose('2d-graphics')} sx={{ color: theme.palette.primary.extraLight }}>2D Graphics</MenuItem>
          <MenuItem onClick={()=>handleClose('tank')} sx={{ color: theme.palette.primary.extraLight }}>Tank</MenuItem>
          <MenuItem onClick={()=>handleClose('space')} sx={{ color: theme.palette.primary.extraLight }}>Space</MenuItem>
          <MenuItem onClick={()=>handleClose('sailing')} sx={{ color: theme.palette.primary.extraLight }}>Sailing</MenuItem>
          <MenuItem onClick={()=>handleClose('side-scroller')} sx={{ color: theme.palette.primary.extraLight }}>Side Scroller</MenuItem>
          <MenuItem onClick={()=>handleClose('superhero')} sx={{ color: theme.palette.primary.extraLight }}>Superhero</MenuItem>
          <MenuItem onClick={()=>handleClose('permadeath')} sx={{ color: theme.palette.primary.extraLight }}>Permadeath</MenuItem>
        </Link>
      </Menu>
    </Box>
  );
}
