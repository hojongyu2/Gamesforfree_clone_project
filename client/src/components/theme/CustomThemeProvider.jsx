import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary:{
            extraLight:'#aaa',
            light: '#373B40',
            main: '#272b30',
            dark: '#17181A'
        },
        secondary:{
            main: "#0d6efd",
        },
        // info:{
        //     main: infoColor
        // }
    },
    breakpoints: {
        values: {
            xxs: 0,    
            xs: 360,
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