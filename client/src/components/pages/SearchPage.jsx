import Layout from "../layout/Layout";
import RecommendationCardList from "../homePageComponents/RecommendationCardList";
import { useState } from "react";
import SearchAndSortGameCard from "../cards/SearchAndSortGameCard";
import { searchGames } from "../../utilities/gameDataAxios";

//MUI
import { Box, Link, TextField, Typography, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

//lodash to make a debounce function
// Debounce is a programming technique used to limit the rate at which a function can be called.
import { debounce } from 'lodash';

export const SearchPage = () => {

  const theme = useTheme();
  const [foundGames, setFoundGames] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const debouncedSearch = debounce(async (searchTerm) => {
    try {
      const data = await searchGames(searchTerm);
      if (data.length > 0) {
        setFoundGames(data)
        setErrorMessage(null) // if data exist, then clear error message
      }else {
        setErrorMessage('Sorry, no games found!')
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, 2000);

  const onChangeSearchInput = (event) => {
        debouncedSearch(event.target.value)
  }

  return (
    <Layout>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={2}
        sx={{marginTop:'20px'}}
      >
        <Box display={"flex"} flexDirection={"row"} gap={1}>
          <SearchIcon
            fontSize="large"
            sx={{ color: theme.palette.primary.extraLight }}
          />
          <Typography
            variant="h4"
            sx={{ color: theme.palette.primary.extraLight }}
          >
            Find Games
          </Typography>
        </Box>
        <Box>
          <TextField
            onChange={onChangeSearchInput}
            type="text"
            label="Search for games"
            InputProps={{ sx: { color: "white" } }}
            InputLabelProps={{ sx: { color: "white" } }}
            sx={{
              color: "white",
              backgroundColor: "primary.dark",
              borderRadius: "5px",
              height: "56px",
              width: "20vw",
            }}
            required
          />
        </Box>
            {errorMessage && <Typography sx={{color:theme.palette.primary.extraLight }}>{errorMessage}</Typography>}
        <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'center', alignContent:'center', flexWrap:'wrap', gap:2}}>
            {!errorMessage && foundGames.map((game)=>{
                return (
                    <Link href={`/${game.id}`}>
                        <SearchAndSortGameCard data={game} />
                    </Link>
                )
            })}
        </Box>
        <Box marginBottom={"10px"}>
          <RecommendationCardList />
        </Box>
      </Box>
    </Layout>
  );
};
