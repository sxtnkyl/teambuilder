import React, { useState, useEffect } from "react";
import { animated, useSpring, config } from "react-spring";
import { Grid, makeStyles, Paper, Typography } from "../../../theme/themIndex";
import { useDexContext } from "../../../context/globalContext";

const useStyles = makeStyles((theme) => ({
  card: {
    background: "red",
    boxShadow: `2px 2px 1px ${theme.palette.primary.dark}, -2px -2px 1px ${theme.palette.primary.dark}`,
    borderRadius: theme.spacing(2),
    border: `${theme.palette.primary.main} 2px solid`,
  },
}));

//STATS: abilities/typing matchups, base stats
const Stats = () => {
  const classes = useStyles();
  const [{ genList, currentDexGen, globalIndex }, dispatch] = useDexContext();
  let currentSinglePoke = genList[currentDexGen - 1].pokes[globalIndex];

  const typings = [];
  currentSinglePoke.nameUrlObj.types.forEach((t) => typings.push(t.type.name));

  return (
    <>
      <Grid item xs={12}>
        <Paper className={classes.card}>
          <img src={currentSinglePoke.img} alt="pokeSprite" />
          <Typography variant="h5">
            {currentSinglePoke.dexNo}
            {currentSinglePoke.name}
          </Typography>
          <Typography variant="body1">
            Height: {currentSinglePoke.nameUrlObj.height}
          </Typography>
          <Typography variant="body1">
            Weight: {currentSinglePoke.nameUrlObj.weight}
          </Typography>
          <Typography variant="body1">
            Typings: {typings.toString("/")}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.card}>
          <img src={currentSinglePoke.img} alt="pokeSprite" />
          <Typography variant="h5">
            {currentSinglePoke.dexNo}
            {currentSinglePoke.name}
          </Typography>
          <Typography variant="body1">
            Height: {currentSinglePoke.nameUrlObj.height}
          </Typography>
          <Typography variant="body1">
            Weight: {currentSinglePoke.nameUrlObj.weight}
          </Typography>
          <Typography variant="body1">
            Typings: {typings.toString("/")}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.card}>
          <img src={currentSinglePoke.img} alt="pokeSprite" />
          <Typography variant="h5">
            {currentSinglePoke.dexNo}
            {currentSinglePoke.name}
          </Typography>
          <Typography variant="body1">
            Height: {currentSinglePoke.nameUrlObj.height}
          </Typography>
          <Typography variant="body1">
            Weight: {currentSinglePoke.nameUrlObj.weight}
          </Typography>
          <Typography variant="body1">
            Typings: {typings.toString("/")}
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Stats;
