import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";

export default function GamesPagePagenation({
  filteredGameData,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}) {
  const theme = useTheme();
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(filteredGameData.length / itemsPerPage)}
        color="secondary"
        page={currentPage}
        onChange={handlePageChange}
        sx={{backgroundColor:theme.palette.primary.light, fontSize: '2em', marginBottom:'20px'}}
      />
    </Stack>
  );
}
