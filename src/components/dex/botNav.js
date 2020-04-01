import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  IconButton,
  ArrowDownward,
  ArrowUpward
} from "../../theme/themIndex";
import { useDexContext } from "../../context/globalContext";

const useStyles = makeStyles(theme => ({
  botNav: {
    zIndex: "2",
    background: `linear-gradient(${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
    minHeight: "8%",
    boxShadow: `4px 0px 6px ${theme.palette.primary.dark}`
  },
  genNavs: {},
  listNavs: {}
}));

const BotNav = ({ handleGenChange, moveSlide }) => {
  const classes = useStyles();
  const [{ currentDexGen }, dispatch] = useDexContext();

  const genNavButtons = (
    <Grid item className={classes.genNavs}>
      <IconButton onClick={() => handleGenChange(-1)}>
        <ArrowDownward />
      </IconButton>
      <IconButton onClick={() => handleGenChange(1)}>
        <ArrowUpward />
      </IconButton>
    </Grid>
  );

  const listNavButtons = (
    <Grid item className={classes.listNavs}>
      <IconButton onClick={() => moveSlide(1)}>
        <ArrowDownward />
      </IconButton>
      <IconButton onClick={() => moveSlide(-1)}>
        <ArrowUpward />
      </IconButton>
    </Grid>
  );

  return (
    <Grid
      item
      container
      justify="space-between"
      alignItems="center"
      className={classes.botNav}
    >
      {genNavButtons}
      <Typography className={classes.genLabel}>Gen: {currentDexGen}</Typography>
      {listNavButtons}
    </Grid>
  );
};

export default BotNav;
