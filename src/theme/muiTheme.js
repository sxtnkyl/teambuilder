import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey, red, lightBlue } from "@material-ui/core/colors";
import { fade } from "@material-ui/core/styles/colorManipulator";
//uses black scale
//https://www.fonts.com/font/microsoft-corporation/verdana
const carbon =
  "linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px, linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px, linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px, linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px, linear-gradient(90deg, #1b1b1b 10px, transparent 10px), linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424)";

// const checker = `linear-gradient(45deg, ${blueGrey[700]} 25%, transparent 25%, transparent 75%, ${blueGrey[700]} 75%, ${blueGrey[700]}), linear-gradient(45deg, ${blueGrey[700]} 25%, transparent 25%, transparent 75%, ${blueGrey[700]} 75%, ${blueGrey[700]})`;

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[900],
    },
    secondary: {
      main: lightBlue["A400"],
      wrappers: {
        main: red[500],
      },
      carbonTexture: {
        main: carbon,
      },
    },
  },
});

const theme = createMuiTheme({
  palette: {
    text: {
      primary: defaultTheme.palette.primary.main,
    },
    primary: defaultTheme.palette.primary,
    secondary: defaultTheme.palette.secondary,
    background: {
      paper: defaultTheme.palette.secondary.light,
    },
  },
  spacing: defaultTheme.spacing,
  typography: {
    h2: {
      textTransform: "uppercase",
      textAlign: "center",
      color: "white",
      fontWeight: "700",
      padding: defaultTheme.spacing(3),
      width: "100%",
    },
    h4: {
      textTransform: "uppercase",
      textAlign: "center",
      fontWeight: "700",
    },
    h5: {
      fontWeight: "700",
    },
    h6: {
      textAlign: "center",
      fontWeight: "600",
    },
    body1: {
      textTransform: "uppercase",
      textAlign: "center",
      fontWeight: "700",
    },
    subtitle1: {
      fontWeight: "500",
      color: defaultTheme.palette.primary.dark,
    },
    subtitle2: {
      color: defaultTheme.palette.primary.light,
    },
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
        overflow: "hidden",
      },
    },
    MuiButton: {
      outlined: {
        "&:hover": {
          background: "white",
        },
      },
    },
    MuiChip: {
      root: {
        // boxShadow: `4px 4px 6px ${defaultTheme.palette.primary.dark}`,
        textTransform: "uppercase",
      },
      outlined: {
        backgroundColor: "white",
        color: defaultTheme.palette.primary.main,
        fontWeight: "700",
        border: `${defaultTheme.palette.primary.main} 2px solid`,
        boxShadow: `2px 2px 3px ${defaultTheme.palette.primary.dark}`,
      },
    },
    MuiGrid: {
      container: {},
    },
    MuiIconButton: {
      root: {
        marginLeft: defaultTheme.spacing(1),
        marginRight: defaultTheme.spacing(1),
        color: defaultTheme.palette.primary.dark,
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: fade(defaultTheme.palette.secondary.dark, 0.4),
      },
    },
    MuiExpansionPanelSummary: {
      root: {
        border: `8px solid ${defaultTheme.palette.secondary.wrappers.main}`,
        background: `linear-gradient(135deg, white 0%, white 55%, ${defaultTheme.palette.secondary.wrappers.main} 55%)`,
        "&$expanded": {
          // background: defaultTheme.palette.secondary.wrappers.main,
          borderBottom: "none !important",
          marginBottom: defaultTheme.spacing(0),
        },
      },
      content: {
        margin: "0px",
        "&$expanded": {
          // background: defaultTheme.palette.secondary.wrappers.main,
          margin: "0px",
        },
      },
    },
    MuiExpansionPanelDetails: {
      root: {
        background: "transparent",
        border: `8px solid ${defaultTheme.palette.secondary.wrappers.main}`,
        boxShadow: `inset 2px 2px 3px ${defaultTheme.palette.primary.light}, inset -2px -2px 3px ${defaultTheme.palette.primary.light}`,
        backdropFilter: "blur(7px)",
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "transparent",
      },
      elevation16: {
        zIndex: "110",
        backgroundColor: fade(defaultTheme.palette.secondary.dark, 0.2),
        backdropFilter: "blur(15px)",
        boxShadow: defaultTheme.shadows[20],
      },
    },
    MuiMobileStepper: {
      root: {
        background: "none",
      },
    },
    MuiTableRow: {
      root: {
        "& .MuiTableCell-root": {
          fontWeight: "600",
        },
        "&$hover:hover": {
          background: `linear-gradient(135deg, white 0%, white 17%, transparent 17%)`,
        },
        // "&$hover:hover th": {
        //   background: `linear-gradient(135deg, white 0%, white 75%, transparent 75%)`,
        // },
      },
    },
    MuiTabs: {
      root: {
        color: defaultTheme.palette.primary.light,
        "& .MuiTab-textColorInherit.Mui-selected": {
          color: defaultTheme.palette.primary.dark,
        },
      },
      indicator: {
        background: defaultTheme.palette.primary.dark,
      },
    },
    MuiTab: {
      wrapper: {
        color: defaultTheme.palette.primary.dark,
        fontSize: defaultTheme.typography.body1.fontSize,
        fontWeight: "700",
      },
    },
    MuiSlider: {
      root: {
        color: defaultTheme.palette.primary.dark,
        background: "",
        height: "80% !important",
      },
      rail: {
        color: defaultTheme.palette.primary.light,
        width: `50% !important`,
        opacity: "0.75",
      },
      track: {
        color: "transparent",
        width: `50% !important`,
      },
      mark: {
        width: "50%",
      },
      thumb: {
        color: defaultTheme.palette.secondary.wrappers.main,
        width: `90% !important`,
        height: `10px !important`,
        border: `2px solid ${defaultTheme.palette.primary.main}`,
        borderRadius: defaultTheme.spacing(2),
        cursor: "pointer",
      },
    },
    MuiSkeleton: {
      wave: {
        animation: "$wave 1s linear -0.5s infinite alternate",
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
      },
    },
  },
});

export default theme;
