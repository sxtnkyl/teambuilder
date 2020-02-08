import React, { useState, useEffect } from "react";
import { Slider } from "../../theme/themIndex";

const IndexSlider = ({ index, slides, moveIndexBySlider }) => {
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
  console.log();

  const handleSliderChange = (e, newval) => {
    moveIndexBySlider(newval);
  };

  return (
    <Slider
      orientation="vertical"
      value={index}
      onChange={handleSliderChange}
      marks={makeMarks()}
      max={max}
      min={min}
    />
  );
};

export default IndexSlider;
