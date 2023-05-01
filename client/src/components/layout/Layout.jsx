import { Box, useTheme } from "@mui/material";
import { GlobalStyles } from '@mui/system';
import Header from "./Header";
import Footer from "./Footer";

export default function Layout(props) {
  const { children } = props;
  const theme = useTheme();

  return (
    <>
      <GlobalStyles styles={{ // This will apply to all compoenents in my app.
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: theme.palette.primary.main,
        },
      }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Box>
          <Header />
        </Box>
        <Box
          sx={{
            flex: "1",
          }}
        >
          {children}
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
