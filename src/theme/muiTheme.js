import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey, red, lightBlue } from "@material-ui/core/colors";
import { fade } from "@material-ui/core/styles/colorManipulator";
//uses black scale
//
const carbon =
  "linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px, linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px, linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px, linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px, linear-gradient(90deg, #1b1b1b 10px, transparent 10px), linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424)";

const checker = `linear-gradient(45deg, ${blueGrey[700]} 25%, transparent 25%, transparent 75%, ${blueGrey[700]} 75%, ${blueGrey[700]}), linear-gradient(45deg, ${blueGrey[700]} 25%, transparent 25%, transparent 75%, ${blueGrey[700]} 75%, ${blueGrey[700]})`;

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[900]
    },
    secondary: {
      main: lightBlue["A400"],
      wrappers: {
        main: red[500]
      },
      carbonTexture: {
        main: carbon
      }
    }
  }
});

const theme = createMuiTheme({
  palette: {
    primary: defaultTheme.palette.primary,
    secondary: defaultTheme.palette.secondary,
    background: {
      paper: defaultTheme.palette.secondary.light
    }
  },
  spacing: defaultTheme.spacing,
  typography: {
    h2: {
      textTransform: "uppercase",
      textAlign: "center",
      color: "white",
      fontWeight: "700",
      padding: defaultTheme.spacing(3),
      width: "100%"
    }
  },
  overrides: {
    MuiContainer: {
      root: {
        background: carbon,
        backgroundColor: blueGrey[900],
        backgroundSize: "20px 20px",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }
    },
    MuiGrid: {
      container: { height: "100%" }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: fade(defaultTheme.palette.secondary.dark, 0.7)
      }
    },
    MuiPaper: {
      elevation16: {
        zIndex: "110",
        backgroundColor: fade(defaultTheme.palette.secondary.dark, 0.2),
        backdropFilter: "blur(15px)",
        boxShadow: defaultTheme.shadows[20]
      }
    }
  }
});

export default theme;
