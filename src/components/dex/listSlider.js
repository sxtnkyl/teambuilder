import React from "react";
import {
  makeStyles,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Details
} from "../../theme/themIndex";
import { Spring, config } from "react-spring/renderprops";
import { withGesture } from "react-with-gesture";

const useStyles = makeStyles(theme => ({
  indicator: {
    background: "white",
    borderRadius: theme.spacing(5),
    border: `${theme.palette.secondary.wrappers.main} 2px solid`,
    position: "absolute",
    left: "0%",
    transformOrigin: "50% 50%"
  },
  tag: {
    background: theme.palette.secondary.wrappers.main,
    borderRadius: theme.spacing(5),
    border: `${theme.palette.primary.main} 2px solid`,
    position: "absolute",
    left: "0%",
    transformOrigin: "50% 50%"
  },
  button: {
    border: "none",
    width: "100%",
    background: theme.palette.secondary.light,
    clipPath:
      "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)"
  },
  leftPointer: {
    transform: "rotate(90deg)",
    marginRight: theme.spacing(2)
  }
}));

//content = sprite
const Slider = ({ dexNo, name, offsetRadius, index, moveSlide, delta }) => {
  //delta for future gesture use
  const classes = useStyles();

  const offsetFromMiddle = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  //for opacity- increase denominator to increase opacity (ex. ofsetRadius+1)
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / offsetRadius);

  const handleButtonClick = () => {
    moveSlide(offsetFromMiddle);
  };

  //value for spring- dist from center  //////need to formulate closer offsets that works for offsetRadius of both 1(1) and 2(25)
  const translateYoffset =
    5 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
  let translateY = -50;

  ///////for future gesture use
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

  const hasIndicator = offsetFromMiddle === 0 ? classes.indicator : classes.tag;

  //if lastPoke = dexNo & offsetFromMiddle = offsetRadius

  return (
    <>
      <Spring
        to={{
          transform: `translateX(0%) translateY(${translateY}%)`,
          top: `${
            offsetRadius === 0
              ? 50
              : 50 + (offsetFromMiddle * 50) / offsetRadius
          }%`,
          opacity: distanceFactor > 0 ? 1 : 0
        }}
        config={config.gentle}
      >
        {style => (
          <ListItem
            style={{
              ...style,
              zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2)
            }}
            className={hasIndicator}
          >
            {distanceFactor === 1 && (
              <Details className={classes.leftPointer} />
            )}
            <Button
              variant="outlined"
              className={classes.button}
              onClick={handleButtonClick}
              disabled={!(distanceFactor > 0)}
            >
              <Typography variant="h6">{dexNo}</Typography>
              <ListItemText>{name}</ListItemText>
            </Button>
          </ListItem>
        )}
      </Spring>
    </>
  );
};

export default Slider;
