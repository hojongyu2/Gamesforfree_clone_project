import { Box } from "@mui/material";
import Header from "./Header";

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
        </Box>
    )
}