import React, { useState } from 'react';
import { gameContext } from '../context/GameContext';
import { useContext } from 'react';
//MUI
import { Box, Button, Card, CardMedia, Link, MenuItem, Menu, Typography, useTheme } from '@mui/material';
import { deleteFromMyGameList, saveGameDataAndAddToMyFavList } from '../../utilities/gameDataAxios';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function FavoriteGameCard({ data }) {
    const {api_id = "",
        title = "",
        thumbnail = "",
        game_url = "",
        screenshots = [],
        my_game_status = "",
    } = data

    const { isUpdated, setIsUpdated } = useContext(gameContext);

    // Screenshots valiations. If the data is not in an Array format, then set it as an empty array.
    const validScreenshots = Array.isArray(screenshots) ? screenshots : [];
    const images = [thumbnail, ...validScreenshots.map((image) => image.image)];

    //useTheme hook from MUI. 
    const theme = useTheme()

    //Handle Select menu in Add button
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // onclick add to my list
    const handleClose = async (status) => {
        setAnchorEl(null);
        const updatedData = {
            ...data,
            my_game_status: status,
        }
        const response = await saveGameDataAndAddToMyFavList(updatedData)
        console.log(response)
        setIsUpdated((prevState) => !prevState)
    };

    const handleDeleteAndClose = async () => {
        setAnchorEl(null);
        const response = await deleteFromMyGameList(api_id)
        console.log(response)
        setIsUpdated((prevState) => !prevState)
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            minWidth:'200px',
            maxWidth:'1000px',
            width:'100%',
            backgroundColor: theme.palette.primary.light,
            marginBottom: '20px',
            padding:'10px',
            transition: 'transform 0.2s ease-in-out',
            ':hover': {
                transform: 'scale(1.02)',
            },
        }}>
            <Card sx={{
                position: 'relative', width: '200px', height: '100px', overflow: 'hidden', margin: '20px',
            }}>
                {images.map((image, index) => (
                    <CardMedia
                        key={index}
                        component="img"
                        src={image}
                        alt={title}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "fill",
                            position: "absolute",
                            transition: "opacity 1s linear",
                        }}
                    />
                ))}
            </Card>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
            }}>
                <Link href={`${api_id}`}>
                    <Button sx={{ color: theme.palette.primary.extraLight }}>{title}</Button>
                </Link>

                <Button sx={{ color: theme.palette.primary.extraLight }}>{my_game_status}</Button>
                
                <Link href={`${game_url}`} sx={{textDecoration: 'none'}}>
                    <Button sx={{ backgroundColor: theme.palette.secondary.main, color: 'white', paddingLeft:'40px', paddingRight:'40px'}}>
                        Play Now
                        <PlayCircleIcon sx={{color: 'white'}} />
                    </Button>
                </Link>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: 0,
            }}>

                <Button onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minWidth: 'auto',
                        padding: 0,
                    }}>
                    <AddCircleOutlineIcon sx={{ color: theme.palette.primary.extraLight }} />
                    <Typography variant="body2"></Typography>
                </Button>
                <Button onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minWidth: 'auto',
                        padding: 0,
                    }}>
                    <DeleteOutlineIcon sx={{ color: theme.palette.primary.extraLight }} />
                    <Typography variant="body2"></Typography>
                </Button>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    getContentAnchorEl={null}
                    PaperProps={{sx:{ backgroundColor: theme.palette.primary.light }}}
                >
                    <MenuItem onClick={() => handleClose("played")} sx={{ color: theme.palette.primary.extraLight }}>Played</MenuItem>
                    <MenuItem onClick={() => handleClose("play_later")} sx={{ color: theme.palette.primary.extraLight }}>Play Later</MenuItem>
                    <MenuItem onClick={() => handleClose("currently_playing")} sx={{ color: theme.palette.primary.extraLight }}>Currently Playing</MenuItem>
                    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 1, width: '100%', textAlign: 'center' }}>
                        <MenuItem onClick={handleDeleteAndClose} sx={{ color: theme.palette.primary.extraLight }}>Delete from my List</MenuItem>
                    </Box>
                </Menu>
            </Box>
        </Box>
    );
}