//https://codesandbox.io/s/react-vertical-carousel-d6mu7
import React, { useState, useEffect } from "react";
import {
  Grid,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  ArrowUpward,
  ArrowDownward
} from "../../theme/themIndex";
import PropTypes from "prop-types";
import Slider from "./spriteSlider";
import { useDexContext } from "../../context/globalContext";

const useStyles = makeStyles(theme => ({
  navs: {
    background: "",
    marginLeft: theme.spacing(1)
  },
  genLabel: {
    marginLeft: theme.spacing(1),
    background: ""
  },
  slideSide: {
    background: "",
    flex: "1",
    position: "relative"
  }
}));

const SpriteSide = props => {
  const classes = useStyles();
  const {
    slides,
    index,
    offsetRadius,
    showNavigation,
    moveSlide,
    modBySlidesLength,
    moveIndexBySlider
  } = props;
  const [{ currentDexGen, genList }, dispatch] = useDexContext();

  //confirm data types
  SpriteSide.propTypes = {
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any,
        img: PropTypes.string
      })
    ).isRequired,
    // goToSlide: PropTypes.number,
    showNavigation: PropTypes.bool,
    offsetRadius: PropTypes.number
  };

  // function mod(a, b) {
  //   // console.log(a, b, a % b, (a % b) + b, ((a % b) + b) % b);
  //   return ((a % b) + b) % b;
  // }

  // const modBySlidesLength = index => {
  //   return mod(index, slides.length);
  // };

  //////need to set limit on renders//////
  //pass 1 or -1 as direction
  // const moveSlide = direction => {
  //   setState({
  //     ...state,
  //     // goToSlide: null,
  //     index: modBySlidesLength(state.index + direction)
  //   });
  // };

  const clampOffsetRadius = offsetRadius => {
    const upperBound = Math.floor((slides.length - 1) / 2);

    if (offsetRadius < 0) {
      return 0;
    }
    if (offsetRadius > upperBound) {
      return upperBound;
    }

    return offsetRadius;
  };

  const getPresentableSlides = () => {
    const newOffsetRadius = clampOffsetRadius(offsetRadius);
    const presentableSlides = [];

    for (let i = -newOffsetRadius; i < 1 + newOffsetRadius; i++) {
      presentableSlides.push(slides[modBySlidesLength(index + i)]);
    }

    return presentableSlides;
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

  const navigationButtons = (
    <Grid item className={classes.navs}>
      <Toolbar disableGutters>
        <IconButton onClick={() => handleGenChange(-1)}>
          <ArrowDownward />
        </IconButton>
        <IconButton onClick={() => handleGenChange(1)}>
          <ArrowUpward />
        </IconButton>
        <Typography className={classes.genLabel}>
          Gen: {currentDexGen}
        </Typography>
      </Toolbar>
    </Grid>
  );

  return (
    <>
      <Grid item className={classes.slideSide}>
        {getPresentableSlides().map((slide, index) => (
          <Slider
            key={slide.dexNo}
            img={slide.img}
            moveSlide={moveSlide}
            offsetRadius={clampOffsetRadius(offsetRadius)}
            index={index}
          />
        ))}
      </Grid>
      {showNavigation ? navigationButtons : null}
    </>
  );
};

export default SpriteSide;
