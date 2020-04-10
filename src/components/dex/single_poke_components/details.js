import React, { useState, useEffect } from "react";
import { animated, useSpring, config } from "react-spring";
import { Grid, makeStyles, Paper, Typography } from "../../../theme/themIndex";
import { useDexContext } from "../../../context/globalContext";

const useStyles = makeStyles((theme) => ({
  gridcard: {
    marginBottom: theme.spacing(2),
    background: `linear-gradient(180deg, ${theme.palette.secondary.wrappers.main} 50%, white 50%)`,
    boxShadow: `4px 4px 6px ${theme.palette.primary.dark}`,
    borderRadius: theme.spacing(2),
    border: `${theme.palette.primary.main} 2px solid`,
  },
  card: {
    background: theme.palette.secondary.main,
    borderRadius: theme.spacing(2),
    border: `${theme.palette.primary.main} 2px solid`,
  },
}));

//DETAILS: sprite(forms)/name/height/weight/typing, flavor texts(foreach obj => obj.language.name == 'en'), evo chain
const Details = () => {
  const classes = useStyles();
  const [{ genList, currentDexGen, globalIndex }, dispatch] = useDexContext();
  let currentSinglePoke = genList[currentDexGen - 1].pokes[globalIndex];

  const { img, dexNo, name, nameUrlObj, urlObj } = currentSinglePoke;

  const flavorTexts = [];
  //get english entries
  urlObj.flavor_text_entries.forEach(
    (t) => t.language.name === "en" && flavorTexts.push(t)
  );
  function compareStrings(a, b) {
    if (a.flavor_text < b.flavor_text) {
      return -1;
    }
    if (a.flavor_text > b.flavor_text) {
      return 1;
    }
    return 0;
  }
  //sort by flavor_text
  flavorTexts.sort(compareStrings);
  //filter out duplicates
  function removeDups(arr) {
    let newArr = [...arr];
    let noDups = [];
    let i = 0;
    for (let j = 1; j < newArr.length; j++) {
      if (j === newArr.length - 1) {
        newArr[j].flavor_text !== newArr[j - 1].flavor_text &&
          noDups.push(newArr[j]);
      }
      if (newArr[i].flavor_text !== newArr[j].flavor_text) {
        noDups.push(newArr[i]);
        i = j;
      } else {
        j++;
      }
    }
    //need to figure out how to filter out strings with arrow character- chrome has arrow for line breaks?
    // function noArrow(item) {
    //   console.log(
    //     item.flavor_text.indexOf(
    //       String.fromCharCode(13) || String.fromCharCode(10)
    //     )
    //   );
    //   return item.flavor_text.indexOf(
    //     String.fromCharCode(13) || String.fromCharCode(10)
    //   );
    // }
    return noDups;
  }
  const filteredTexts = removeDups(flavorTexts);

  const typings = [];
  nameUrlObj.types.forEach((t) => typings.push(t.type.name));

  return (
    <>
      <Grid item xs={12} className={classes.gridcard} id="sprites">
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
      <Grid item xs={4} className={classes.gridcard}>
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
      <Grid item xs={12} className={classes.gridcard}>
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

export default Details;
