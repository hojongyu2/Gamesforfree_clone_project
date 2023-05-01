import { useState, useEffect, useContext } from "react";
import { getAllReviews, writeReview } from "../../utilities/reviewAxios";
import { gameContext } from "../context/GameContext";

import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { userContext } from "../context/UserContext";

export default function GameCardWithReviews({ data }) {
  const {
    id = "",
    title = "",
    description = "",
    screenshots = [],
  } = data;

  const { setBackgroundImage } = useContext(gameContext);
  const { user } = useContext(userContext);
  const [inputValue, setInputValue] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [reviewUpdateTrigger, setReviewUpdateTrigger] = useState(false);

  // set background Image for game information page
  setBackgroundImage(data.thumbnail);

  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllReviews(id);
      //   console.log(response);
      const sortedReviews = response.data.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setAllReviews(sortedReviews);
    };
    fetchData();
  }, [reviewUpdateTrigger]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmitReviewButton = async () => {
    if (!user) {
      alert("You must be signed in to perform this action");
    }
    const idAndReview = {
      api_id: id,
      user_review: inputValue,
    };
    const response = await writeReview(idAndReview);
    console.log(response);
    setReviewUpdateTrigger((prevState) => !prevState);
    setInputValue("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "transparent",
        marginTop: "20px",
      }}
    >
      <Box>
        <Typography
          variant="h5"
          sx={{ color: theme.palette.primary.extraLight }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <ThumbsUpDownIcon />
          <Typography
            variant="body2"
            sx={{ color: theme.palette.primary.extraLight }}
          >
            Member Ratings
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <PeopleOutlineIcon />
          <Typography
            variant="body2"
            sx={{ color: theme.palette.primary.extraLight }}
          >
            Number of Library
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <ChatBubbleOutlineIcon />
          <Typography
            variant="body2"
            sx={{ color: theme.palette.primary.extraLight }}
          >
            Number of reviews
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <img></img>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 2,
        }}
      >
        <img
          src="https://www.freetogame.com/assets/images/avatars/default/default.png"
          style={{ width: "50px", height: "50px" }}
        />
        <TextField
          label={`Write a review for ${title}! Share your thoughts with our community.`}
          variant="outlined"
          value={inputValue}
          onChange={handleChange}
          sx={{
            "& .MuiInputBase-input": {
              color: theme.palette.primary.extraLight,
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.primary.extraLight,
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.extraLight,
            },
            width:'30vw',
          }}
        />
        <Button
          onClick={handleSubmitReviewButton}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </Box>
      <Box sx={{ maxWidth: "500px" }}>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.primary.extraLight }}
        >
          About {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.primary.extraLight,
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            cursor: "pointer",
            marginTop: "10px",
          }}
          onClick={(event) => {
            event.currentTarget.style.webkitLineClamp =
              event.currentTarget.style.webkitLineClamp === "2" ? "unset" : "2";
          }}
        >
          {description}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.primary.extraLight }}
        >
          Additional Information
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <ErrorOutlineIcon
            sx={{ color: theme.palette.primary.extraLight }}
          ></ErrorOutlineIcon>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.primary.extraLight }}
          >
            Please note this free-to-play game may or may not offer optional
            in-game purchases.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.primary.extraLight }}
        >
          {title} screenshots
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            marginTop: "10px",
          }}
        >
          {screenshots.map((pic) => {
            return (
              <img
                src={pic.image}
                style={{ width: "200px", transition: "transform 0.3s" }}
                onMouseOver={(event) => {
                  event.currentTarget.style.transform = "scale(1.5)";
                }}
                onMouseOut={(event) => {
                  event.currentTarget.style.transform = "scale(1)";
                }}
              ></img>
            );
          })}
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.primary.extraLight }}
        >
          User Reviews
        </Typography>
        {allReviews.map((review, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: 2,
                margin: "20px",
              }}
            >
              <img
                src={review.random_profile_pic}
                style={{ width: "50px", height: "50px", borderRadius: "100%" }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  gap: 1,
                  backgroundColor: theme.palette.primary.dark,
                  width: "30vw",
                  borderRadius: "4px",
                  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
                  p: 2,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignContent: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.primary.extraLight }}
                  >
                    {review.username}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.primary.light }}
                  >
                    '2daysago'
                  </Typography>
                </Box>

                <Divider
                  sx={{ backgroundColor: theme.palette.primary.light }}
                />

                <Box>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.primary.extraLight }}
                  >
                    {review.content}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignContent: "center",
          gap: 1,
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.primary.extraLight }}
        >
          Play this game and post your review!
        </Typography>
        <Button
          onClick={() => window.scrollTo(0, 0)}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.extraLight,
          }}
        >
          Submit Review
        </Button>
      </Box>
    </Box>
  );
}
