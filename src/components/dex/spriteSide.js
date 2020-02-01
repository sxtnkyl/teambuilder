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
import Slider from "./slider";

const useStyles = makeStyles(theme => ({
  navs: {
    background: "red"
  },
  stretch: {
    flex: "1",
    textAlign: "right",
    background: "purple"
  },
  slideSide: {
    background: "pink",
    flex: "1"
  }
}));

const SpriteSide = props => {
  const classes = useStyles();
  const { slides, offsetRadius, showNavigation } = props;

  const [state, setState] = useState({
    //current center display
    index: 0
    // goToSlide: null,
    // prevPropsGoToSlide: 0,
    // newSlide: false
  });
  console.log(state);

  //confirm data types
  SpriteSide.propTypes = {
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any,
        content: PropTypes.object
      })
    ).isRequired,
    // goToSlide: PropTypes.number,
    showNavigation: PropTypes.bool,
    offsetRadius: PropTypes.number
  };

  function mod(a, b) {
    return ((a % b) + b) % b;
  }

  const modBySlidesLength = index => {
    console.log(mod(index, slides.length));
    return mod(index, slides.length);
  };

  //////need to set limit on renders//////
  const moveSlide = direction => {
    setState({
      ...state,
      // goToSlide: null,
      index: modBySlidesLength(state.index + direction)
    });
  };

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
    const { index } = state;
    const newOffsetRadius = clampOffsetRadius(offsetRadius);
    const presentableSlides = [];

    for (let i = -newOffsetRadius; i < 1 + newOffsetRadius; i++) {
      presentableSlides.push(slides[modBySlidesLength(index + i)]);
    }

    return presentableSlides;
  };

  //////need to fix rerender issue on MOVESLIDE
  // useEffect(() => {
  //   document.addEventListener("keydown", event => {
  //     if (event.isComposing || event.keyCode === 229) {
  //       return;
  //     }
  //     if (event.keyCode === 38) {
  //       moveSlide(-1);
  //     }
  //     if (event.keyCode === 40) {
  //       moveSlide(1);
  //     }
  //   });
  // }, [moveSlide]);

  const navigationButtons = (
    <Grid item className={classes.navs}>
      <Toolbar disableGutters>
        <IconButton onClick={() => moveSlide(1)}>
          <ArrowDownward />
        </IconButton>
        <IconButton onClick={() => moveSlide(-1)}>
          <ArrowUpward />
        </IconButton>
        <Typography className={classes.stretch}>Name</Typography>
      </Toolbar>
    </Grid>
  );

  return (
    <>
      {showNavigation ? navigationButtons : null}
      <Grid item className={classes.slideSide}>
        {getPresentableSlides().map((slide, index) => (
          <Slider
            key={slide.key}
            content={slide.content}
            moveSlide={moveSlide}
            offsetRadius={clampOffsetRadius(offsetRadius)}
            index={index}
          />
        ))}
      </Grid>
    </>
  );
};

export default SpriteSide;
