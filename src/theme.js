import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#f3a641",
      main: "#f39621",
      dark: "#f3c661",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
