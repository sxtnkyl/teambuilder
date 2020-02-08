//https://github.com/bvaughn/react-window
//https://material-ui.com/api/list-item/
//https://material-ui.com/components/lists/
//lazy loading adds to held list

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "./listSlider";
import IndexSlider from "./indexSlider";
import {
  Grid,
  makeStyles,
  List,
  Toolbar,
  IconButton,
  ArrowUpward,
  ArrowDownward
} from "../../theme/themIndex";

const useStyles = makeStyles(theme => ({
  navs: {
    background: "",
    marginLeft: "auto",
    marginRight: theme.spacing(1)
  },
  listSide: {
    flex: "1",
    background: ""
  },
  list: {
    height: "100%",
    background: "",
    position: "relative"
  },
  indexSlider: {
    background: "",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const ListSide = props => {
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

  // const [state, setState] = useState({
  //   //current center display
  //   index: 0
  //   // goToSlide: null,
  //   // prevPropsGoToSlide: 0,
  //   // newSlide: false
  // });

  //confirm data types
  ListSide.propTypes = {
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

  //////need to fix rerender issue on MOVESLIDE- too many rerenders
  // useEffect(() => {
  //   document.addEventListener("scroll", event => {
  //     console.log(event);
  //   });
  // });

  const navigationButtons = (
    <Grid item className={classes.navs}>
      <Toolbar disableGutters>
        <IconButton onClick={() => moveSlide(1)}>
          <ArrowDownward />
        </IconButton>
        <IconButton onClick={() => moveSlide(-1)}>
          <ArrowUpward />
        </IconButton>
      </Toolbar>
    </Grid>
  );

  return (
    <>
      <Grid item container className={classes.listSide}>
        <Grid item xs={10}>
          <List disablePadding className={classes.list}>
            {getPresentableSlides().map((slide, index) => (
              <Slider
                key={slide.dexNo}
                dexNo={slide.dexNo}
                name={slide.name}
                moveSlide={moveSlide}
                offsetRadius={clampOffsetRadius(offsetRadius)}
                index={index}
              />
            ))}
          </List>
        </Grid>
        <Grid item xs={2} className={classes.indexSlider}>
          <IndexSlider
            index={index}
            slides={slides}
            moveIndexBySlider={moveIndexBySlider}
          />
        </Grid>
      </Grid>
      {showNavigation ? navigationButtons : null}
    </>
  );
};

export default ListSide;
