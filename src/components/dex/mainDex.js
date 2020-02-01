import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "../../theme/themIndex";
import theme from "../../theme/muiTheme";
import SpriteSide from "./spriteSide";
import ListSide from "./listSide";

const useStyles = makeStyles(theme => ({
  container: {
    background: "green",
    borderRadius: theme.shape.borderRadius * 2,
    justifyContent: "space-around"
  },
  half: {
    background: "yellow"
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2)
  }
}));

const slides = [
  {
    key: 1,
    content: "1"
  },
  {
    key: 3,
    content: "2"
  },
  {
    key: 4,
    content: "3"
  },
  {
    key: 5,
    content: "4"
  },
  {
    key: 6,
    content: "5"
  },
  {
    key: 7,
    content: "6"
  },
  {
    key: 8,
    content: "7"
  }
];

const Dex = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true
  });

  return (
    <Grid container className={classes.container}>
      <Grid item xs={5} container direction="column" className={classes.half}>
        <SpriteSide
          slides={slides}
          offsetRadius={state.offsetRadius}
          showNavigation={state.showNavigation}
        />
      </Grid>
      <Grid item xs={5} className={classes.half}>
        <ListSide />
      </Grid>
    </Grid>
  );
};

export default Dex;
