//https://codesandbox.io/s/react-vertical-carousel-d6mu7
import React from "react";
import { Grid, makeStyles } from "../../../theme/themIndex";
import PropTypes from "prop-types";
import Slider from "./spriteSlider";

const useStyles = makeStyles((theme) => ({
  // navs: {
  //   background: "",
  //   paddingLeft: theme.spacing(1),
  //   boxShadow: `4px 0px 6px ${theme.palette.primary.dark}`
  // },
  spriteSlider: {
    background: "",
    position: "relative",
    overflow: "hidden",
  },
}));

const SpriteSide = (props) => {
  const classes = useStyles();
  const {
    slides,
    index,
    offsetRadius,
    moveSlide,
    modBySlidesLength,
    toggleSinglePokeOpen,
  } = props;

  //confirm data types
  SpriteSide.propTypes = {
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any,
        img: PropTypes.string,
      })
    ).isRequired,
    // goToSlide: PropTypes.number,
    showNavigation: PropTypes.bool,
    offsetRadius: PropTypes.number,
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

  const clampOffsetRadius = (offsetRadius) => {
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

  return (
    <Grid
      item
      xs={5}
      container
      justify="center"
      className={classes.spriteSlider}
    >
      {getPresentableSlides().map((slide, index) => (
        <Slider
          key={slide.dexNo}
          img={slide.img}
          moveSlide={moveSlide}
          offsetRadius={clampOffsetRadius(offsetRadius)}
          index={index}
          toggleSinglePokeOpen={toggleSinglePokeOpen}
        />
      ))}
    </Grid>
  );
};

export default SpriteSide;
