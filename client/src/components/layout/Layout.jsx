import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

export default  function Layout (props) {
    const {children} = props
    return (
        <Box>
            <Box>
                <Header />
            </Box>
            <Box>
                {children}
            </Box>
            <Box>
                <Footer />
            </Box>
        </Box>
    )
}