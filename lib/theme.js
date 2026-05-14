import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#C9A84C',      // dirty golden
        },
        secondary: {
            main: '#6B1E2A',      // maroon
        },
        background: {
            default: '#F5ECD7',   // light brown / off white
            paper: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", sans-serif',
    },
})

export default theme