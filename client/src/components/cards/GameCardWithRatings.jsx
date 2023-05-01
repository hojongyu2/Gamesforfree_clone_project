import React, { useContext, useEffect, useState, useRef } from 'react';
import { getGameDetailById, saveGameDataAndAddToMyFavList } from '../../utilities/gameDataAxios';
import { getAllRatings, rateMygame } from '../../utilities/ratingAxios';
import { userContext } from '../context/UserContext';

//Mui Library
import { Box, Button, Card, CardMedia, IconButton, Link, MenuItem, Menu, Select, Typography, keyframes, useTheme } from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styled from '@emotion/styled';

export default function GameCardWithRatings({ data }) {
    const { id = "",
        title = "",
        thumbnail = "",
        game_url = "",
        screenshots = [],
    } = data
    const { user } = useContext(userContext);
    const [numberOfLikes, setNumberOfLikes] = useState(0)
    const [numberOfNeutrals, setNumberOfNeutrals] = useState(0)
    const [numberOfDislikes, setNumberOfDislikes] = useState(0)
    const [ratingUpdateTrigger, setRatingUpdateTrigger] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllRatings(id);
            const data = response.data;
            const likes = data.filter((rating) => rating.value === 'like').length;
            const neutrals = data.filter((rating) => rating.value === 'neutral').length;
            const dislikes = data.filter((rating) => rating.value === 'dislike').length;

            setNumberOfLikes(likes);
            setNumberOfNeutrals(neutrals);
            setNumberOfDislikes(dislikes);
        };
        fetchData();
    }, [ratingUpdateTrigger]);

    // Styling
    const images = [thumbnail, ...screenshots.map((image) => image.image)];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const intervalRef = useRef(null); // useRef will store the interval created by the setInterval. 
    //This allows you to access the current interval value across renders without causing a re-render when the interval reference changes.

    useEffect(() => {
        if (images.length === 0) {
            return; // Do not set up the interval if there are no images
        }

        intervalRef.current = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalRef.current);
    }, [images]);

    // Fade effect functions
    const fadeInOut = keyframes`
        0%, 100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        `;

    const StyledCardMedia = styled(CardMedia)`
        animation: ${fadeInOut} 3s linear infinite;
        `;

    const StyledIconButton = styled(IconButton)`
        display: flex;
        flex-direction: column;
        width: 10px
        `;

    //useTheme hook from MUI. 
    const theme = useTheme()

    //Handle Select menu in Add button
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // onclick add to my list
    const handleClose = async (status) => {
        if (!user){
            alert('You must be signed in to perform this action')
        }
        setAnchorEl(null);
        // console.log(status)
        const { id, ...restData } = data
        const updatedData = { //using object destructure to change key named 'id' to 'api_id'
            ...restData,
            api_id: id,
            my_game_status: status,
            minimum_system_requirements: null
        }
        const response = await saveGameDataAndAddToMyFavList(updatedData)
        console.log(response)
    };

    const handleLike = async (ratingValue) => {
        if (!user){
            alert('You must be signed in to perform this action')
        }
        const valueWithIdObj = {
            api_id: id,
            value: ratingValue,
        }
        const response = await rateMygame(valueWithIdObj)
        console.log(response)
        setRatingUpdateTrigger((prevState) => !prevState)
    };

    return (
        <Box sx={{ display: 'inline-block', maxWidth: 345, gap: 3, marginTop:'20px' }}>
            <Card sx={{
                position: 'relative', width: '340px', height: '150px', overflow: 'hidden', marginTop: '10px', marginBottom:'10px',
                [theme.breakpoints.down('md')]: { // Styles for screens smaller than 'md' breakpoint
                    width: '340px',
                    height: '150px',
                },
                [theme.breakpoints.down('sm')]: { // Styles for screens smaller than 'sm' breakpoint
                    width: '200px',
                    height: '100px',
                },
            }}>

                <StyledCardMedia
                    component="img"
                    src={images[currentImageIndex]}
                    alt={title}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                        position: 'absolute',
                        transition: 'opacity 1s ease-in-out', // Added fade transition
                    }}
                />
            </Card>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: 5,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.extraLight,
                borderRadius: '10px',
                marginBottom:'10px',
            }}>
                <Button sx={{color: theme.palette.primary.extraLight}}>Free</Button>
                <Link href={`${game_url}`}>
                    <Button sx={{color: theme.palette.secondary.main}}>Play</Button>
                </Link>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: 0,
                backgroundColor: theme.palette.primary.main,
                borderRadius: '10px'
            }}>

                <StyledIconButton onClick={() => handleLike("like")} sx={{ color: theme.palette.primary.extraLight }} >
                    <MoodIcon></MoodIcon>
                    <Typography variant='body2'>{numberOfLikes}</Typography>
                    <Typography variant='body2'>LIKE</Typography>
                </StyledIconButton>

                <StyledIconButton onClick={() => handleLike("neutral")} color="info" >
                    <MoodBadIcon></MoodBadIcon>
                    <Typography variant='body2'>{numberOfNeutrals}</Typography>
                    <Typography variant='body2'>MEH</Typography>
                </StyledIconButton>

                <StyledIconButton onClick={() => handleLike("dislike")} color="error" >
                    <SentimentVeryDissatisfiedIcon></SentimentVeryDissatisfiedIcon>
                    <Typography variant='body2'>{numberOfDislikes}</Typography>
                    <Typography variant='body2'>DISLIKE</Typography>
                </StyledIconButton>

                <Button onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minWidth: 'auto',
                        padding: 0,
                        color: 'greenyellow',
                    }}>
                    <AddCircleOutlineIcon />
                    <Typography variant="body2">+</Typography>
                    <Typography variant="body2">ADD</Typography>
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
                        <MenuItem onClick={() => handleClose("delete")} sx={{ color: theme.palette.primary.extraLight }}>Delete from my List</MenuItem>
                    </Box>
                </Menu>
            </Box>
        </Box>
    );
}



