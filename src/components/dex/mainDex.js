import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "../../theme/themIndex";
import TopNav from "./topNav";
import SinglePoke from "./single_poke_components/singlePoke";
import BotNav from "./botNav";

import SpriteSide from "./list_view_components/spriteSide";
import ListSide from "./list_view_components/listSide";
import IndexSlider from "./list_view_components/indexSlider";

import makeSlides from "../../utility/makeSlides";
import { useDexContext } from "../../context/globalContext";

const useStyles = makeStyles((theme) => ({
  container: {
    background: "",
    height: "100%",
    maxHeight: "100%",
    borderRadius: theme.shape.borderRadius * 2,
    overflow: "hidden",
  },
  listView: {
    background: "",
    flex: "1",
  },
  singlePokeView: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(4),
    background: "",
    flex: "1",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: theme.spacing(1),
      opacity: "0.5",
    },
    "&::-webkit-scrollbar-track": {
      width: theme.spacing(2),
      backgroundColor: theme.palette.primary.light,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
    },
  },
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
    activeTab: 0,
    showNavigation: true,
    singlePokeOpen: false,
  });
  useEffect(() => {
    makeSlides(currentDexGen, genList, dispatch);

    //made global state 'globalIndex' to use in dispatch for updateSinglePoke url/name objects
    if (globalIndex !== state.index) {
      dispatch({
        type: "updateGlobalIndex",
        // newPokemon: (selectedGen.pokes = pokeArr)
        newIndex: state.index,
      });
    }
  }, [currentDexGen, state.index]);

  const activePoke =
    typeof slides[state.index] !== "undefined"
      ? slides[state.index]
      : "Loading...";

  const moveIndexBySlider = (i) => {
    setState({
      ...state,
      // goToSlide: null,
      index: i,
    });
  };

  //////need to set limit on renders//////
  //pass 1 or -1 as direction
  const moveSlide = (direction) => {
    setState({
      ...state,
      // goToSlide: null,
      index: modBySlidesLength(state.index + direction),
    });
  };

  function mod(a, b) {
    // console.log(a, b, a % b, (a % b) + b, ((a % b) + b) % b);
    return ((a % b) + b) % b;
  }

  const modBySlidesLength = (index) => {
    return mod(index, slides.length);
  };

  //+1 for up, -1 for down
  const handleGenChange = (direction) => {
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
      singlePokeOpen: !state.singlePokeOpen,
    });
  };

  const handleTabs = (e, newtab) => {
    setState({ ...state, activeTab: newtab });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <TopNav
        activePoke={activePoke}
        singlePokeOpen={state.singlePokeOpen}
        toggleSinglePokeOpen={toggleSinglePokeOpen}
        handleTabs={handleTabs}
        tabs={state.activeTab}
      />

      {state.singlePokeOpen ? (
        <Grid
          xs={11}
          item
          container
          direction="row"
          alignItems="center"
          spacing={2}
          className={classes.singlePokeView}
        >
          <SinglePoke
            singlePokeOpen={state.singlePokeOpen}
            activeTab={state.activeTab}
          />
        </Grid>
      ) : (
        <Grid item container direction="row" className={classes.listView}>
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
      )}
      <BotNav
        handleGenChange={handleGenChange}
        moveSlide={moveSlide}
        singlePokeOpen={state.singlePokeOpen}
      />
    </Grid>
  );
};

export default Dex;
