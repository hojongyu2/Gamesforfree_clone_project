import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary:{
            extraLight:'#9e9e9e',
            light: '#616161',
            main: '#424242',
            dark: '#212121'
        },
        secondary:{
            main: "#37474f",
        },
        // info:{
        //     main: infoColor
        // }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        }
    }
})

export default function CustomThemeProvider(props){
    const {children} = props;

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}