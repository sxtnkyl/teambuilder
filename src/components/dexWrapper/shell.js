import React, { useState, useEffect } from "react";
import { animated, useSpring, config } from "react-spring";
import theme from "../../theme/muiTheme";
import { makeStyles, Button } from "../../theme/themIndex";
import { useDexContext } from "../../context/globalContext";

//underlens for blue shadow
const lensShellActive =
  "radial-gradient(circle at center, hsla(199, 100%, 60%, 1) 60%, hsla(199,100%,75%, .07) 70%)";

//////shell styles
//faint lines
const metalLines =
  "-webkit-repeating-linear-gradient(140deg, hsla(0,0%,0%,0) 0.2%, hsla(0,0%,0%,0.15) 5%, hsla(0,0%,0%,.02) 12%)";
//UNDERGLOSS- transparent (topleft)black to (botright)red
const underGloss =
  "linear-gradient(140deg, hsla(0,100%,50%,0.3) 50%, hsla(0,100%,50%,0.3) 60%, hsla(0,100%,50%,.5) 80%)";
//GLOSS- solid (topleft)red to (botright)white
const gloss =
  "linear-gradient(140deg, hsl(0,50%,40%) 0%, hsl(0,50%,50%) 60%, hsl(0,50%,55%) 80%, hsl(0,50%,60%) 100%)";

const shellGradientTop = metalLines + "," + underGloss + "," + gloss;
const shellGradientBottom = metalLines + "," + underGloss + "," + gloss;

//////outlines  for various parts- inset color horz vert blur thickness
//innerBody, top/bot shell, lens, lens shell
const shellShadow =
  "inset hsla(0,0%,15%,  1) 0  0px 0px 4px, inset hsla(0,0%,15%, .8) 0 0px 5px 4px, inset hsla(0,0%,0%, .25) 0 0px 0px 7px, inset hsla(0,0%,100%,.7) 0  0px 1px 7px, hsla(0,0%, 0%,.15) 0 0px 6px 4px, 0  0px 6px 4px";

//powerlight and shoulders
const cornerShadow =
  "inset hsla(0,0%,15%,  1) 0  0px 0px 4px, inset hsla(0,0%,15%, .8) 0 -1px 5px 4px, inset hsla(0,0%,0%, .25) 0 -1px 0px 7px, inset hsla(0,0%,100%,.7) 0  2px 1px 7px, hsla(0,0%, 0%,.15) 0 -5px 6px 2px";

//screen inline top/bottom, lens arm
const screenInlineShadow =
  "hsla(0,0%,15%,  1) 0  0px 0px 5px, inset hsla(0,0%,15%, .8) 0 -1px 3px 4px, inset hsla(0,0%,15%, .2) 0 0px 10px 20px,  hsla(0,0%,0%, .25) 0 -1px 0px 7px,   inset hsla(0,0%, 0%,.15) 0 -5px 2px 2px";

//screen
const screenShadow =
  "inset hsla(199, 100%, 40%, 1) 0px 0px 2px 2px, hsla(0,0%,15%,  1) 0  0px 0px 4px,  hsla(0,0%,15%, .8) 0 -1px 5px 4px,  hsla(0,0%,0%, .25) 0 -1px 0px 7px,  hsla(0,0%,100%,.7) 0  2px 1px 7px, inset hsla(0,0%, 0%,.15) 0 -5px 6px 2px";

//speaker hole pattern
const speakerHoles =
  "radial-gradient(black 15%, transparent 16%) 0 0, radial-gradient(black 15%, transparent 16%) 8px 8px, radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px, radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px";

const useStyles = makeStyles(theme => ({
  //full container, position for other parts
  wrap: {
    height: "100%",
    width: "100%",
    background: "transparent",
    position: "absolute",
    zIndex: "40"
  },
  innerBody: {
    height: "50%",
    width: "80%",
    zIndex: "50",
    position: "absolute",
    left: "10%",
    top: "25%",
    background: theme.palette.primary.dark,
    boxShadow: shellShadow
  },
  //////TOP COMPONENTS
  top: {
    height: "40%",
    width: "85%",
    zIndex: "70",
    position: "absolute",
    left: "10%",
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
    boxShadow: shellShadow,
    background: shellGradientTop
  },
  //relative to top
  powerLight: {
    height: "50px",
    width: "50px",
    position: "absolute",
    right: "5%",
    top: "25%",
    background: "#00cc00",
    borderRadius: "50%",
    boxShadow: cornerShadow
  },
  //relative to top
  shoulderTop: {
    height: "15%",
    width: "20%",
    backgroundColor: "white",
    backgroundSize: "20px 20px",
    position: "absolute",
    top: "0%",
    right: "0%",
    borderBottomLeftRadius: "40px",
    borderTopRightRadius: "40px",
    boxShadow: cornerShadow
  },
  //relative to top
  screenInlineTop: {
    height: "68.25%",
    width: "74%",
    position: "absolute",
    left: "10%",
    top: "30%",
    background: shellGradientTop,
    boxShadow: screenInlineShadow,
    borderRadius: theme.shape.borderRadius
  },
  //////BOTTOM COMPONENTS
  bottom: {
    height: "40%",
    width: "85%",
    zIndex: "70",
    background: theme.palette.secondary.main,
    position: "absolute",
    left: "10%",
    bottom: "0%",
    borderBottomLeftRadius: "40px",
    borderBottomRightRadius: "40px",
    boxShadow: shellShadow,
    backgroundImage: shellGradientBottom
  },
  //relative to bottom
  speakerHoles: {
    height: "100px",
    width: "100px",
    position: "absolute",
    right: "5%",
    top: "30%",
    backgroundColor: "transparent",
    backgroundSize: "20px 20px",
    background: speakerHoles,
    transform: "rotate(45deg)"
  },
  //relative to bottom
  shoulderBottom: {
    height: "15%",
    width: "20%",
    backgroundColor: "white",
    position: "absolute",
    bottom: "0%",
    right: "0%",
    borderTopLeftRadius: "40px",
    borderBottomRightRadius: "40px",
    boxShadow: cornerShadow
  },
  //relative to bottom
  screenInlineBottom: {
    height: "68.25%",
    width: "74%",
    position: "absolute",
    left: "10%",
    bottom: "30%",
    background: shellGradientBottom,
    // background: theme.palette.primary.dark,
    boxShadow: screenInlineShadow,
    borderRadius: theme.shape.borderRadius
  },
  //////put screen in center of wrap
  screen: {
    width: "60%",
    position: "absolute",
    zIndex: "90",
    left: "20%",
    background: theme.palette.secondary.light,
    // background: theme.palette.primary.dark,
    boxShadow: screenShadow,
    borderRadius: theme.shape.borderRadius * 2
  },
  //////relative to wrap
  lensArm: {
    height: "8vw",
    width: "15vw",
    zIndex: "55",
    position: "absolute",
    top: "42%",
    left: "10%",
    borderRadius: theme.shape.borderRadius,
    borderStyle: "black 3px double",
    boxShadow: screenInlineShadow,
    background: shellGradientBottom
  },
  //////relative to wrap
  lensShell: {
    height: "16vw",
    width: "16vw",
    position: "absolute",
    top: "34%",
    borderRadius: theme.shape.borderRadius,
    borderStyle: "black 3px double",
    boxShadow: shellShadow,
    background: shellGradientBottom
  },
  //relative to lensShell
  underLens: {
    height: "100%",
    width: "100%",
    background: lensShellActive
  },
  //relative to lensShell
  lens: {
    height: "80%",
    width: "80%",
    position: "absolute",
    top: "10%",
    left: "10%",
    borderRadius: "50%",
    boxShadow: shellShadow
  },
  //relative to lens
  lensReflection: {
    transform: "rotate(135deg) skew(10deg)",
    height: "0%",
    width: "0%",
    position: "absolute",
    top: "45%",
    left: "40%",
    borderLeft: "60px solid transparent",
    borderRight: "60px solid transparent",
    borderTop: "90px solid hsla(199, 100%, 80%, .15)",
    borderRadius: "50%"
  }
}));

//SPRING CHANGES FOR EACH COMPONENT
//Order:screen, lensArm, shell

const Shell = () => {
  const classes = useStyles();
  const [{ open }, dispatch] = useDexContext();

  ////lens: onHover, glow
  const [hover, setHover] = useState(false);

  ////screen: spring height and top
  const screenSpring = useSpring({
    height: open ? "70%" : "0%",
    top: open ? "15%" : "50%"
  });
  const lensGlow = useSpring({
    background: !hover
      ? "radial-gradient(circle at center, hsla(199, 100%, 35%, 1) 20%, hsla(199, 100%, 80%, .7) 40%, hsla(199, 100%, 80%, .6) 50%, hsla(199, 100%, 25%, 1) 80%)"
      : "radial-gradient(circle at center, hsla(199, 100%, 35%, 0.5) 8%, hsla(199, 100%, 80%, .7) 10%, hsla(199, 100%, 80%, .6) 60%, hsla(199, 100%, 25%, 1) 80%)",
    config: config.slow
  });
  const underGlow = useSpring({
    background: !hover
      ? "radial-gradient(circle at center, hsla(199, 100%, 60%, 1) 60%, hsla(199,100%,75%, .07) 70%)"
      : "radial-gradient(circle at center, hsla(199, 100%, 70%, 1) 60%, hsla(199,100%,85%, .2) 73%)"
  });
  const lensRetract = useSpring({
    x: open ? 0 : 1
  });
  const shellTopSpring = useSpring({
    top: open ? "0%" : "10%",
    config: config.slow
  });
  const shellBottomSpring = useSpring({
    bottom: open ? "0%" : "10%",
    config: config.slow
  });

  const lensArm = <div className={classes.lensArm} />;

  const powerLight = <div className={classes.powerLight} />;
  const screenInlineTop = <div className={classes.screenInlineTop} />;
  const shoulderTop = <Button className={classes.shoulderTop}></Button>;
  const topShell = (
    <animated.div style={shellTopSpring} className={classes.top}>
      {powerLight}
      {shoulderTop}
      {screenInlineTop}
    </animated.div>
  );
  const speakerHoles = <div className={classes.speakerHoles} />;
  const screenInlineBottom = <div className={classes.screenInlineBottom} />;
  const shoulderBottom = <Button className={classes.shoulderBottom}></Button>;
  const botShell = (
    <animated.div style={shellBottomSpring} className={classes.bottom}>
      {speakerHoles}
      {shoulderBottom}
      {screenInlineBottom}
    </animated.div>
  );

  const lensR = <div className={classes.lensReflection} />;
  const lens = (
    <animated.div
      style={lensGlow}
      className={classes.lens}
      onClick={() => dispatch({ type: "toggleOpen" })}
      onMouseEnter={e => {
        setHover(true);
      }}
      onMouseLeave={e => {
        setHover(false);
      }}
    >
      {lensR}
    </animated.div>
  );
  const underLens = (
    <animated.div style={underGlow} className={classes.underLens} />
  );

  const lensShell = (
    <animated.div
      style={{
        left: lensRetract.x
          .interpolate({ range: [0, 0.5, 1], output: [1, -6.5, 10] })
          .interpolate(x => `${x}%`),
        zIndex: lensRetract.x
          .interpolate({ range: [0, 0.5, 0.55, 1], output: [80, 80, 65, 65] })
          .interpolate(x => `${x}`)
      }}
      className={classes.lensShell}
    >
      {lens}
      {underLens}
    </animated.div>
  );

  const screen = (
    <animated.div style={screenSpring} className={classes.screen} />
  );
  const innerBody = <div className={classes.innerBody} />;

  return (
    <div className={classes.wrap}>
      {lensShell}
      {innerBody}
      {lensArm}
      {topShell}
      {botShell}
      {screen}
    </div>
  );
};

export default Shell;
