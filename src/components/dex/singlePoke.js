import React, { useState, useEffect } from "react";
import { animated, useSpring, config } from "react-spring";
import {
  Grid,
  makeStyles,
  Paper,
  Tabs,
  Tab,
  Typography,
  IconButton,
  ArrowDownward,
  ArrowUpward
} from "../../theme/themIndex";
import theme from "../../theme/muiTheme";
import makeSinglePoke from "../../utility/makeSinglePoke";
import { useDexContext } from "../../context/globalContext";

//body made of cards sorted by tabs:

//MOVES: moves(name/type/power/acc) by levelup, tm, egg //expand to see individual class/pp/descrip
//STATS: abilities/typing matchups, base stats
//BREEDING: egg groups happy growth rate hatch counter

const useStyles = makeStyles(theme => ({
  singlePoke: {
    background: "",
    minHeight: "84%",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  card: {
    background: "white",
    boxShadow: `2px 2px 3px ${theme.palette.primary.dark}`,
    borderRadius: theme.spacing(5),
    border: `${theme.palette.secondary.wrappers.main} 2px solid`
  }
}));

const SinglePoke = ({
  activePoke,
  singlePokeOpen,
  toggleSinglePokeOpen,
  index
}) => {
  const classes = useStyles();
  const [{ genList, currentDexGen }, dispatch] = useDexContext();
  const slides = genList[currentDexGen - 1].pokes;
  const currentSinglePoke = slides[index];

  useEffect(() => {
    //when index changes, if Object.keys(currentSinglePoke.urlObj).length / Object.keys(currentSinglePoke.nameUrlObj).length dont fetch
    if (Object.keys(currentSinglePoke.urlObj).length === 0) {
      if (Object.keys(currentSinglePoke.nameUrlObj).length === 0) {
        makeSinglePoke(currentSinglePoke, dispatch);
      }
    }
    console.log(currentSinglePoke);
  }, [index]);

  //DETAILS: sprite(forms)/name/height/typing, flavor texts(foreach obj => obj.language.name == 'en'), evo chain
  const details = (
    <Grid item xs={12}>
      details
    </Grid>
  );

  const moves = <Grid></Grid>;

  const stats = <Grid></Grid>;

  const breeding = <Grid></Grid>;

  return (
    <Grid
      item
      xs={12}
      container
      justify="space-between"
      alignItems="center"
      className={classes.singlePoke}
    >
      {details}
    </Grid>
  );
};

export default SinglePoke;
