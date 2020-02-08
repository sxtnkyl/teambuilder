import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "../../theme/themIndex";
import theme from "../../theme/muiTheme";
import SpriteSide from "./spriteSide";
import ListSide from "./listSide";
import makeSlides from "../../utility/makeSlides";
import { useDexContext } from "../../context/globalContext";

const useStyles = makeStyles(theme => ({
  container: {
    background: "",
    borderRadius: theme.shape.borderRadius * 2,
    justifyContent: ""
  },
  leftHalf: {
    background: "",
    maxHeight: "100%"
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2)
  },
  rightHalf: {
    background: "",
    maxHeight: "100%"
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2)
  }
}));

const Dex = () => {
  const classes = useStyles();
  const [{ genList, currentDexGen }, dispatch] = useDexContext();
  const slides = genList[currentDexGen - 1].pokes;

  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadiusSprite: 2,
    offsetRadiusList: 4,
    index: 0,
    showNavigation: true
  });
  useEffect(() => {
    makeSlides(currentDexGen, genList, dispatch);
  }, [currentDexGen]);

  const moveIndexBySlider = i => {
    setState({
      ...state,
      // goToSlide: null,
      index: i
    });
  };

  //////need to set limit on renders//////
  //pass 1 or -1 as direction
  const moveSlide = direction => {
    setState({
      ...state,
      // goToSlide: null,
      index: modBySlidesLength(state.index + direction)
    });
  };

  function mod(a, b) {
    // console.log(a, b, a % b, (a % b) + b, ((a % b) + b) % b);
    return ((a % b) + b) % b;
  }

  const modBySlidesLength = index => {
    return mod(index, slides.length);
  };

  return (
    <Grid container className={classes.container}>
      <Grid
        item
        xs={6}
        container
        direction="column"
        className={classes.leftHalf}
      >
        <SpriteSide
          slides={slides}
          index={state.index}
          offsetRadius={state.offsetRadiusSprite}
          showNavigation={state.showNavigation}
          moveSlide={moveSlide}
          modBySlidesLength={modBySlidesLength}
        />
      </Grid>
      <Grid
        item
        xs={6}
        container
        direction="column"
        className={classes.rightHalf}
      >
        <ListSide
          slides={slides}
          index={state.index}
          offsetRadius={state.offsetRadiusList}
          showNavigation={state.showNavigation}
          moveSlide={moveSlide}
          modBySlidesLength={modBySlidesLength}
          moveIndexBySlider={moveIndexBySlider}
        />
      </Grid>
    </Grid>
  );
};

export default Dex;
