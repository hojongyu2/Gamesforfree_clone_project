import { useContext, useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { userContext } from "../context/UserContext";
import { useLocation, useParams } from "react-router-dom";
import { getGameList } from "../../utilities/gameDataAxios";
import GamesPagePagenation from "../menu/GamesPagePagenation";
import PlatformMenu from "../menu/PlatformMenu";
import GenreTagMenu from "../menu/GenreTagMenu";
import SortByMenu from "../menu/SortByMenu";
import SearchAndSortGameCard from "../cards/SearchAndSortGameCard";

import { Box, Container, Link, Typography, useTheme } from "@mui/material";
import { axiosWithCSRF } from "../../utilities/axiosWithCSRF";

// useLocation allows to get query from url
// query is a key-value pairs that follow the question mark (?) in the URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function GamesPage() {
  const theme = useTheme();

  const [filteredGameData, setFilteredGameData] = useState([]);

  // sort/filter/get datas
  const { platform: urlPlatform, category: urlCategory } = useParams();

  const DEFAULT_CATEGORY = "mmoprg";
  const DEFAULT_PLATFORM = "all";

  const query = useQuery();
  const sort_by = query.get("sort_by") || "relevance"; // if there are no sort_by query then set a default value as relevance

  const filterValue = {
    sort_by: sort_by,
    category: urlCategory || DEFAULT_CATEGORY,
    platform: urlPlatform || DEFAULT_PLATFORM,
  };

  //get filtered data using query and parameter
  useEffect(() => {
    const fetchData = async () => {
      const response = await getGameList(filterValue);
      setFilteredGameData(response);
    };
    fetchData();
  }, []);

  // Pagenation
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const visibleItems = filteredGameData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Box sx={{ color: theme.palette.primary.extraLight }}>
          <Typography variant="h5">
            Top Free {urlCategory.toUpperCase()} Games for PC and Browser
          </Typography>
          <Typography variant="body2" m={2}>
            {filteredGameData.length} free-to-play {urlCategory.toUpperCase()} games found in our
            games list!
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
          <PlatformMenu />
          <GenreTagMenu urlPlatform={urlPlatform} />
          <SortByMenu urlPlatform={urlPlatform} urlCategory={urlCategory} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {visibleItems.map((gameData) => {
            return (
              <Link href={`/${gameData.id}`} sx={{ textDecoration: "none" }}>
                <SearchAndSortGameCard data={gameData} />
              </Link>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GamesPagePagenation
          filteredGameData={filteredGameData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </Box>
    </Layout>
  );
}
