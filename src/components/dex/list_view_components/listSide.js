//https://github.com/bvaughn/react-window
//https://material-ui.com/api/list-item/
//https://material-ui.com/components/lists/
//lazy loading adds to held list

import React from "react";
import PropTypes from "prop-types";
import Slider from "./listSlider";
import { Grid, makeStyles } from "../../../theme/themIndex";

const useStyles = makeStyles((theme) => ({
  nameList: {
    background: "",
    position: "relative",
    overflow: "hidden",
  },
}));

const ListSide = (props) => {
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
  ListSide.propTypes = {
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
    <Grid item xs={6} container justify="center" className={classes.nameList}>
      {getPresentableSlides().map((slide, index) => (
        <Slider
          key={slide.dexNo}
          dexNo={slide.dexNo}
          name={slide.name}
          moveSlide={moveSlide}
          offsetRadius={clampOffsetRadius(offsetRadius)}
          index={index}
          toggleSinglePokeOpen={toggleSinglePokeOpen}
        />
      ))}
    </Grid>
  );
};

export default ListSide;
