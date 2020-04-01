import React, { useState, useEffect } from "react";
import { animated, useSpring, config } from "react-spring";
import {
  Grid,
  makeStyles,
  Typography,
  IconButton,
  ArrowDownward,
  ArrowUpward
} from "../../theme/themIndex";
import theme from "../../theme/muiTheme";
import SinglePoke from "./singlePoke";

const useStyles = makeStyles(theme => ({
  topNav: {
    zIndex: "2",
    boxShadow: `-4px 0px 6px ${theme.palette.primary.dark}`
  }
}));

const TopNav = ({ activePoke, singlePokeOpen, toggleSinglePokeOpen }) => {
  const classes = useStyles();

  const AnimatedNav = animated(Grid);
  const openSinglePoke = useSpring({
    height: singlePokeOpen ? "92%" : "8%",
    background: singlePokeOpen
      ? `linear-gradient(${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`
      : `linear-gradient(${theme.palette.secondary.light}, ${theme.palette.secondary.main})`
  });

  const closedTopNav = (
    <>
      <Typography variant="h5">{activePoke.name}</Typography>
      <IconButton onClick={toggleSinglePokeOpen}>
        {singlePokeOpen ? <ArrowUpward /> : <ArrowDownward />}
      </IconButton>
    </>
  );

  return (
    <AnimatedNav
      style={openSinglePoke}
      item
      container
      justify="space-between"
      alignItems="center"
      className={classes.topNav}
    >
      {closedTopNav}
      {singlePokeOpen && <SinglePoke />}
    </AnimatedNav>
  );
};

export default TopNav;
