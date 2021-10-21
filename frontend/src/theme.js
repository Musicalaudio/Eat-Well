import { createTheme, responsiveFontSizes } from "@material-ui/core";

const theme = createTheme({
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
    palette: {
      primary: {
        main: '#C80075'
      },
      secondary: {
        main: '#00C853'
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 670,
        md: 900,
        lg: 1200,
        xl: 1536,
      }
    },
})

// responsiveFontSizes(theme)

export default theme;