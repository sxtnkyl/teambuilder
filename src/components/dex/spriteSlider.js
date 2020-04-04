import React from "react";
import { makeStyles } from "../../theme/themIndex";
import { Spring, config } from "react-spring/renderprops";
// import { withGesture } from "react-with-gesture";

const useStyles = makeStyles(theme => ({
  singleItem: {
    background: "",
    position: "absolute",
    transformOrigin: "50% 50%",
    height: "70%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
    // boxShadow: `inset 1px 1px 4px ${theme.palette.primary.dark}, inset -1px -1px 4px ${theme.palette.primary.dark}`
  },
  img: {
    height: "100%"
  },
  indicator: {
    height: "100%",
    border: `${theme.palette.secondary.wrappers.main} 8px solid`,
    clipPath:
      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
  }
}));

//content = sprite
const Slider = ({ img, offsetRadius, index, delta }) => {
  const classes = useStyles();
  //calculated for each +2/-2 from index
  // console.log(index, offsetRadius);

  const offsetFromMiddle = index - offsetRadius;
  // const totalPresentables = 2 * offsetRadius + 1;
  //for opacity- increase denominator to increase opacity (ex. ofsetRadius+1)
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / offsetRadius);

  //value for spring- dist from center
  const translateYoffset =
    50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
  let translateY = -50;

  ///////for future gesture  use
  // if (offsetRadius !== 0) {
  //   if (index === 0) {
  //     translateY = 0;
  //   } else if (index === totalPresentables - 1) {
  //     translateY = -100;
  //   }
  // }

  // if (offsetFromMiddle === 0) {
  //   translateY += delta[1] / (offsetRadius + 1);
  //   if (translateY > -40) {
  //     //////need to fix rerender issue on MOVESLIDE- too many rerenders
  //     moveSlide(-1);
  //   }
  //   if (translateY < -100) {
  //     moveSlide(1);
  //   }
  // }

  //below center
  if (offsetFromMiddle > 0) {
    translateY += translateYoffset;
  }
  //above center
  else if (offsetFromMiddle < 0) {
    translateY -= translateYoffset;
  }

  const hasIndicator = offsetFromMiddle === 0 ? classes.indicator : classes.img;

  function imgError() {
    return "Poke image unavailable";
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
          <img
            className={hasIndicator}
            src={img}
            alt="poke-sprite"
            onError={imgError}
          />
        </div>
      )}
    </Spring>
  );
};

export default Slider;
