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
  ArrowUpward,
} from "../../../theme/themIndex";

const useStyles = makeStyles((theme) => ({
  card: {
    background: "white",
    boxShadow: `2px 2px 3px ${theme.palette.primary.dark}`,
    borderRadius: theme.spacing(5),
    border: `${theme.palette.secondary.wrappers.main} 2px solid`,
  },
}));

//DETAILS: sprite(forms)/name/height/weight/typing, flavor texts(foreach obj => obj.language.name == 'en'), evo chain
const Details = ({ currentSinglePoke }) => {
  const classes = useStyles();
  useEffect(() => {
    console.log(currentSinglePoke);
  }, [currentSinglePoke]);

  const typings = [];
  currentSinglePoke.nameUrlObj.types.forEach((t) => typings.push(t.type.name));

  return (
    <Grid
      item
      xs={12}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
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
  );
};

export default Details;
