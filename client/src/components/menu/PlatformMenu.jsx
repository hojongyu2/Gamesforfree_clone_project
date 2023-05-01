import * as React from "react";
// MUI
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Link, Typography, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WindowIcon from "@mui/icons-material/Window";
import ComputerIcon from "@mui/icons-material/Computer";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function PlatformMenu({ category = 'mmorpg' }) {
  const [menuItemValue, setMenuItemValue]= useState("all")
  const { platform } = useParams();


  const theme = useTheme();
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (menuItemValue) => {
    setMenuItemValue(menuItemValue)
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ color: theme.palette.primary.extraLight }}>
        Platform:{" "}
      </Typography>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="small"
        sx={{ color: "white" }}
      >
        {platform}
        <ExpandMoreIcon sx={{ color: theme.palette.secondary.main }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.extraLight,
          },
        }}
      >
        <MenuItem disabled sx={{ color: theme.palette.primary.extraLight }}>Browse By Platform:</MenuItem>
        <Link href={`/${menuItemValue}/${category}`}>
          <MenuItem onClick={() => handleClose("pc")} sx={{ color: theme.palette.primary.extraLight }}>
            <ComputerIcon />
            Window (PC)
          </MenuItem>
          <MenuItem onClick={() => handleClose("browser")} sx={{ color: theme.palette.primary.extraLight }}>
            <WindowIcon />
            Broswer (Web)
          </MenuItem>
          <MenuItem onClick={() => handleClose("all")} sx={{ color: theme.palette.primary.extraLight }}>All Platforms</MenuItem>
        </Link>
      </Menu>
    </Box>
  );
}
