import React, { useState, useEffect } from "react";
import { Spring } from "react-spring/renderprops";
import {
  Grid,
  makeStyles,
  Typography,
  IconButton,
  ArrowDownward,
  ArrowUpward,
} from "../../theme/themIndex";
import theme from "../../theme/muiTheme";
import { useDexContext } from "../../context/globalContext";

const useStyles = makeStyles((theme) => ({
  botNav: {
    zIndex: "2",
    background: `linear-gradient(${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
    mixHeight: "8%",
    boxShadow: `0px -4px 4px ${theme.palette.primary.dark}`,
    marginTop: theme.spacing(2),
  },
  genNavs: {},
  listNavs: {},
}));

const BotNav = ({ handleGenChange, moveSlide, singlePokeOpen }) => {
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

  // return (
  //   <Grid
  //     item
  //     container
  //     justify="space-between"
  //     alignItems="center"
  //     className={classes.botNav}
  //   >
  //     {genNavButtons}
  //     <Typography className={classes.genLabel}>Gen: {currentDexGen}</Typography>
  //     {listNavButtons}
  //   </Grid>
  // );
  return (
    <Spring
      to={{
        paddingTop: !singlePokeOpen ? "0px" : `${theme.spacing(1)}`,
        paddingBottom: !singlePokeOpen ? "0px" : `${theme.spacing(1)}`,
        background: singlePokeOpen
          ? `linear-gradient(${theme.palette.secondary.light}, ${theme.palette.secondary.light})`
          : `linear-gradient(${theme.palette.secondary.main}, ${theme.palette.secondary.main})`,
      }}
    >
      {(style) => (
        <Grid
          style={style}
          item
          container
          justify="space-between"
          alignItems="center"
          className={classes.botNav}
        >
          {genNavButtons}
          <Typography className={classes.genLabel}>
            Gen: {currentDexGen}
          </Typography>
          {listNavButtons}
        </Grid>
      )}
    </Spring>
  );
};

export default BotNav;
