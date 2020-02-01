import React from "react";
import { makeStyles, Paper } from "../../theme/themIndex";
import { Spring, config } from "react-spring/renderprops";
import { withGesture } from "react-with-gesture";

const useStyles = makeStyles(theme => ({
  singleItem: {
    background: "gray",
    position: "absolute",
    top: "50%",
    transformOrigin: "50% 50%",
    width: "40%",
    height: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

//content = sprite
const Slider = ({ content, offsetRadius, index, moveSlide, delta }) => {
  const classes = useStyles();
  //calculated for each +2/-2 from index
  console.log(index, offsetRadius);

  const offsetFromMiddle = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  //for opacity
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / (offsetRadius + 1));

  //value for spring- dist from center  //////need to formulate closer offsets that works for offsetRadius of both 1(1) and 2(25)
  const translateYoffset =
    5 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
  let translateY = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateY = 0;
    } else if (index === totalPresentables - 1) {
      translateY = -100;
    }
  }

  if (offsetFromMiddle === 0) {
    translateY += delta[1] / (offsetRadius + 1);
    if (translateY > -40) {
      moveSlide(-1);
    }
    if (translateY < -100) {
      moveSlide(1);
    }
  }
  //below center
  if (offsetFromMiddle > 0) {
    translateY += translateYoffset;
  }
  //above center
  else if (offsetFromMiddle < 0) {
    translateY -= translateYoffset;
  }
  return (
    <Spring
      to={{
        transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
        top: `${
          offsetRadius === 0 ? 50 : 50 + (offsetFromMiddle * 50) / offsetRadius
        }%`,
        opacity: distanceFactor * distanceFactor
      }}
      config={config.gentle}
    >
      {style => (
        <div
          className={classes.singleItem}
          style={{
            ...style,
            zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2)
          }}
        >
          {content}
        </div>
      )}
    </Spring>
  );
};

export default withGesture()(Slider);
