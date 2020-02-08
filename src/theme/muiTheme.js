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
    },
    body1: {
      textTransform: "uppercase",
      textAlign: "center",
      color: defaultTheme.palette.primary.main,
      fontWeight: "700"
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
    MuiButton: {
      outlined: {
        "&:hover": {
          background: "white"
        }
      }
    },
    MuiGrid: {
      container: { height: "100%", overflow: "hidden" }
    },
    MuiIconButton: {
      root: {
        color: defaultTheme.palette.primary.dark
      }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: fade(defaultTheme.palette.secondary.dark, 0.4)
      }
    },
    MuiPaper: {
      elevation16: {
        zIndex: "110",
        backgroundColor: fade(defaultTheme.palette.secondary.dark, 0.2),
        backdropFilter: "blur(15px)",
        boxShadow: defaultTheme.shadows[20]
      }
    },
    MuiSlider: {
      root: {
        color: defaultTheme.palette.primary.dark,
        background: "",
        height: "80% !important"
      },
      rail: {
        color: defaultTheme.palette.primary.light,
        width: `50% !important`,
        opacity: "0.75",
        left: "0%"
      },
      track: {
        color: defaultTheme.palette.primary.main,
        width: `50% !important`,
        left: "0%"
      },
      mark: {
        width: "50%",
        left: "0%"
      },
      thumb: {
        color: defaultTheme.palette.secondary.wrappers.main,
        width: `90% !important`,
        height: `10px !important`,
        border: `2px solid ${defaultTheme.palette.primary.main}`,
        borderRadius: defaultTheme.spacing(2),
        left: "0%"
      }
    }
  }
});

export default theme;
