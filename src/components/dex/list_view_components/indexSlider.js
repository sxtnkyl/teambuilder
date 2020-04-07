import React from "react";
import { Slider, Grid, makeStyles } from "../../../theme/themIndex";

const useStyles = makeStyles((theme) => ({
  indexSlider: {
    background: "",
  },
}));

const IndexSlider = ({ index, slides, moveIndexBySlider }) => {
  const classes = useStyles();

  //find min/max/marks
  let max = slides.length - 1;
  let min = 0;

  const makeMarks = () => {
    let quarters = Math.floor(slides.length / 2 / 2);
    let marks = [];
    let start = 0;
    while (start < slides.length - quarters) {
      let inc = {};
      inc.value = start;
      if (start < slides.length) {
        start += quarters;
        marks.push(inc);
      }
    }
    marks.push({ value: slides.length - 1 });
    return marks;
  };

  const handleSliderChange = (e, newval) => {
    moveIndexBySlider(newval);
  };

  return (
    <Grid
      item
      xs={1}
      container
      justify="center"
      alignItems="center"
      className={classes.indexSlider}
    >
      <Slider
        orientation="vertical"
        value={index}
        onChange={handleSliderChange}
        marks={makeMarks()}
        max={max}
        min={min}
      />
    </Grid>
  );
};

export default IndexSlider;
