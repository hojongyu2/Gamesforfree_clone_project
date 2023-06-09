import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";

export default function SearchAndSortGameCard({ data }) {
  const {
    id = "",
    title = "",
    short_description = "",
    thumbnail = "",
    game_url = "",
    screenshots = [],
  } = data;
  // console.log(data)
  // Screenshots valiations. If the data is not in an Array format, then set it as an empty array.
  const validScreenshots = Array.isArray(screenshots) ? screenshots : [];
  const images = [thumbnail, ...validScreenshots.map((image) => image.image)];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "300px" ,
        backgroundColor: theme.palette.primary.light,
        marginBottom: "20px",
        transition: "transform 0.2s ease-in-out",
        ":hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Card
        sx={{
          position: "relative",
          width: "300px",
          height: "200px",
          overflow: "hidden",
        }}
      >
        {images.map((image, index) => (
          <CardMedia
            key={index}
            component="img"
            src={image}
            alt={"title"}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              opacity: index === currentImageIndex ? 1 : 0,
              transition: "opacity 1s linear",
            }}
          />
        ))}
      </Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
          padding: "10px",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.primary.extraLight,
            overflow: "hidden",
            textOverflow: "ellipsis", 
            whiteSpace: "nowrap", 
            maxWidth: "200px",
          }}
        >
          {title}
        </Typography>
        <Button
          size="small"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: "white",
            textDecoration: "none",
          }}
        >
          free
        </Button>
      </Box>
    </Box>
  );
}
