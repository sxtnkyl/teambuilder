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
import theme from "../../../theme/muiTheme";
import makeSinglePoke from "../../../utility/makeSinglePoke";
import { useDexContext } from "../../../context/globalContext";
import Details from "./details";

//body made of cards sorted by tabs:

//MOVES: moves(name/type/power/acc) by levelup, tm, egg //expand to see individual class/pp/descrip
//STATS: abilities/typing matchups, base stats
//BREEDING: egg groups happy growth rate hatch counter

const useStyles = makeStyles((theme) => ({
  singlePoke: {
    background: "",
    minHeight: "84%",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    overflowY: "auto",
  },
  card: {
    background: "white",
    boxShadow: `2px 2px 3px ${theme.palette.primary.dark}`,
    borderRadius: theme.spacing(5),
    border: `${theme.palette.secondary.wrappers.main} 2px solid`,
  },
}));

const SinglePoke = ({ singlePokeOpen }) => {
  const classes = useStyles();
  const [{ genList, currentDexGen, globalIndex }, dispatch] = useDexContext();

  //things in global state
  let slides = genList[currentDexGen - 1].pokes;
  let currentSinglePoke = slides[globalIndex];
  let currentUrlObj = currentSinglePoke.urlObj;
  let currentNameUrlObj = currentSinglePoke.nameUrlObj;

  const [ready, isReady] = useState(false);

  //catch cases
  useEffect(() => {
    //index changed and data already saved
    if (
      currentUrlObj.flavor_text_entries.length !== 0 &&
      currentNameUrlObj.types.length !== 0
    ) {
      isReady(true);
    }
    //no data in global state, fetch it
    else if (
      currentUrlObj.flavor_text_entries.length === 0 &&
      currentNameUrlObj.types.length === 0
    ) {
      isReady(false);
      makeSinglePoke(currentSinglePoke)
        .then((data) => {
          dispatch({
            type: "updateSinglePokeUrl",
            // newPokemon: (selectedGen.pokes = pokeArr)
            updatedNewPokeUrl: data.urldata,
          });
          dispatch({
            type: "updateSinglePokeName",
            // newPokemon: (selectedGen.pokes = pokeArr)
            updatedNewPokeName: data.namedata,
          });
        })
        .then(isReady(true));
    }
  }, [globalIndex, singlePokeOpen]);

  return (
    <Grid
      item
      xs={12}
      container
      justify="space-between"
      alignItems="center"
      className={classes.singlePoke}
    >
      {ready ? <Details currentSinglePoke={currentSinglePoke} /> : "Loading..."}
    </Grid>
  );
};

export default SinglePoke;
