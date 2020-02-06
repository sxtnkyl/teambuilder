import React from "react";
import { makeStyles, Paper } from "../../theme/themIndex";
import { Spring, config } from "react-spring/renderprops";
import { withGesture } from "react-with-gesture";

const useStyles = makeStyles(theme => ({
  singleItem: {
    background: "",
    position: "absolute",
    left: "20%",
    transformOrigin: "50% 50%",
    width: "auto",
    height: "70%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    height: "100%",
    width: "auto"
  },
  indicator: {
    height: "100%",
    width: "auto",
    border: "5px solid red",
    clipPath:
      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
  }
}));

//content = sprite
const Slider = ({ img, offsetRadius, index, moveSlide, delta }) => {
  const classes = useStyles();
  //calculated for each +2/-2 from index
  // console.log(index, offsetRadius);

  const offsetFromMiddle = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  //for opacity- increase denominator to increase opacity (ex. ofsetRadius+1)
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / offsetRadius);

  //value for spring- dist from center
  const translateYoffset =
    50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
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
      //////need to fix rerender issue on MOVESLIDE- too many rerenders
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

  const hasIndicator = offsetFromMiddle === 0 ? classes.indicator : classes.img;

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
          <img className={hasIndicator} src={img} alt="poke-sprite" />
        </div>
      )}
    </Spring>
  );
};

export default withGesture()(Slider);
