//React
import * as React from "react";
import { useContext } from "react";
import { userContext } from "../context/UserContext";
import { userLogout } from "../../utilities/userAuthAxios";
import { useNavigate } from "react-router-dom";
import { FreeGamesMenu } from "../menu/FreeGamesMenu";
import gamesforfreeLogo from "../../assets/gamesforfreeLogo.png";

// MUI with style components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import CollectionsIcon from "@mui/icons-material/Collections";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useTheme } from "@mui/material";
import { gameContext } from "../context/GameContext";



export default function Header() {
  //context
  const { user, signOutUser } = useContext(userContext);
  const {myFavGameList} = useContext(gameContext)
  const theme = useTheme();

  //MUI functions
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // Logout function with handle menu close
  const LogoutHandleMenuClose = async () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    const response = await userLogout();
    if (response === true) {
      signOutUser();
      // navigate("/");
    }
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{ sx: { backgroundColor: theme.palette.primary.light } }}
    >
      {user && (
        <Link href="/favorite" sx={{textDecoration: 'none'}}>
          <MenuItem
            onClick={handleMenuClose}
            sx={{ color: theme.palette.primary.extraLight }}
          >
            My Favorite Games
          </MenuItem>
        </Link>
      )}
      {user && (
        <Link href="/" sx={{textDecoration: 'none'}}>
          <MenuItem
            onClick={LogoutHandleMenuClose}
            sx={{ color: theme.palette.primary.extraLight }}
          >
            Logout
          </MenuItem>
        </Link>
      )}
      {!user && (
        <Link href="/login">
          <MenuItem
            onClick={handleMenuClose}
            sx={{ color: theme.palette.primary.extraLight }}
          >
            Login
          </MenuItem>
        </Link>
      )}
      {!user && (
        <Link href="/signup">
          <MenuItem
            onClick={handleMenuClose}
            sx={{ color: theme.palette.primary.extraLight }}
          >
            Register
          </MenuItem>
        </Link>
      )}
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{ sx: { backgroundColor: theme.palette.primary.light } }}
    >
      <Link href="/search">
        <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <SearchIcon />
          </IconButton>
          <Typography>Search</Typography>
        </MenuItem>
      </Link>
      <Box>
        <FreeGamesMenu />
      </Box>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <a href="/" style={{ textDecorationLine: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                style={{
                  width: "30px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
                src={gamesforfreeLogo}
                alt="Logo"
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color: theme.palette.primary.extraLight }}
              >
                GAMESFORFREE
              </Typography>
            </Box>
          </a>
          <Box>
            <FreeGamesMenu />
          </Box>
          <Box>
            <Badge badgeContent={0} color="primary">
              <Link href="/special">
                <Typography sx={{ color: theme.palette.primary.extraLight }}>
                  Special Offers
                </Typography>
              </Link>
            </Badge>
          </Box>
          <Box>
            <MoreHorizIcon sx={{ color: theme.palette.primary.extraLight }} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
            <Link href="/search">
              <IconButton size="large" color="inherit">
                <SearchIcon sx={{ color: theme.palette.primary.extraLight }} />
              </IconButton>
            </Link>
            <IconButton
              size="large"
              color="inherit"
            >
              <Link onClick={(e)=>{
                if (!user) {
                  e.preventDefault();
                  alert('You need to be logged in to access this page.');
                }
              }} href="/favorite" sx={{textDecoration: 'none'}}>
                <Badge badgeContent={myFavGameList.length} color="error">
                  <CollectionsIcon
                    sx={{ color: theme.palette.primary.extraLight }}
                  />
                </Badge>
              </Link>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user && (
                <img src={user.user.random_profile_pic}
                style={{width:'30px', height:'30px', borderRadius:'100%', marginRight:'10px'}} />
              )}
              {user && (
                <Typography sx={{ color: theme.palette.primary.extraLight }}>
                  {user.user.email}
                </Typography>
              )}
              {!user && (
                <AccountCircle
                  sx={{ color: theme.palette.primary.extraLight }}
                />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon
                sx={{ backgroundColor: theme.palette.primary.extraLight }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
