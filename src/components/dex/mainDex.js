import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  IconButton,
  ArrowDownward,
  ArrowUpward
} from "../../theme/themIndex";
import TopNav from "./topNav";
import BotNav from "./botNav";
import SpriteSide from "./spriteSide";
import ListSide from "./listSide";
import IndexSlider from "./indexSlider";
import makeSlides from "../../utility/makeSlides";
import { useDexContext } from "../../context/globalContext";

const useStyles = makeStyles(theme => ({
  container: {
    background: "",
    height: "100%",
    overflow: "hidden",
    borderRadius: theme.shape.borderRadius * 2
  },
  middleContent: {
    background: "",
    flexGrow: "1"
  }
}));

const Dex = () => {
  const classes = useStyles();
  const [{ genList, currentDexGen, globalIndex }, dispatch] = useDexContext();
  const slides = genList[currentDexGen - 1].pokes;

  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadiusSprite: 2,
    offsetRadiusList: 4,
    index: 0,
    showNavigation: true,
    singlePokeOpen: false
  });
  useEffect(() => {
    makeSlides(currentDexGen, genList, dispatch);

    //made global state 'globalIndex' to use in dispatch for updateSinglePoke url/name objects
    if (globalIndex !== state.index) {
      dispatch({
        type: "updateGlobalIndex",
        // newPokemon: (selectedGen.pokes = pokeArr)
        newIndex: state.index
      });
    }
    console.log(genList);
  }, [currentDexGen, state.index]);

  const activePoke =
    typeof slides[state.index] !== "undefined"
      ? slides[state.index]
      : "Loading...";

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

  //+1 for up, -1 for down
  const handleGenChange = direction => {
    let num = currentDexGen;
    if (direction < 0) {
      if (currentDexGen === 1) {
        num = 7;
      } else {
        num -= 1;
      }
    }
    if (direction > 0) {
      if (currentDexGen === 7) {
        //set to 1
        num = 1;
      } else {
        num += 1;
      }
    }
    dispatch({ type: "updateCurrentDexGen", newGen: num });
    moveIndexBySlider(0);
  };

  const toggleSinglePokeOpen = () => {
    setState({
      ...state,
      singlePokeOpen: !state.singlePokeOpen
    });
  };

  return (
    <Grid container direction="column" className={classes.container}>
      <TopNav
        activePoke={activePoke}
        singlePokeOpen={state.singlePokeOpen}
        toggleSinglePokeOpen={toggleSinglePokeOpen}
        index={state.index}
      />
      <Grid item container direction="row" className={classes.middleContent}>
        <SpriteSide
          slides={slides}
          index={state.index}
          offsetRadius={state.offsetRadiusSprite}
          showNavigation={state.showNavigation}
          moveSlide={moveSlide}
          modBySlidesLength={modBySlidesLength}
          moveIndexBySlider={moveIndexBySlider}
        />
        <ListSide
          slides={slides}
          index={state.index}
          offsetRadius={state.offsetRadiusList}
          showNavigation={state.showNavigation}
          moveSlide={moveSlide}
          modBySlidesLength={modBySlidesLength}
          moveIndexBySlider={moveIndexBySlider}
        />
        <IndexSlider
          index={state.index}
          slides={slides}
          moveIndexBySlider={moveIndexBySlider}
        />
      </Grid>
      <BotNav handleGenChange={handleGenChange} moveSlide={moveSlide} />
    </Grid>
  );
};

export default Dex;
