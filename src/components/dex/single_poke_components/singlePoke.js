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

//This component fetches data and displays the corresponding active tab

//MOVES: moves(name/type/power/acc) by levelup, tm, egg //expand to see individual class/pp/descrip
//STATS: abilities/typing matchups, base stats
//BREEDING: egg groups happy growth rate hatch counter

const useStyles = makeStyles((theme) => ({
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

  const [ready, setReady] = useState(false);
  useEffect(() => {
    //things in global state
    let slides = genList[currentDexGen - 1].pokes;
    let currentSinglePoke = slides[globalIndex];
    let currentUrlObj = currentSinglePoke.urlObj;
    let currentNameUrlObj = currentSinglePoke.nameUrlObj;

    let checkData = () => {
      return currentUrlObj.flavor_text_entries.length &&
        currentNameUrlObj.types.length
        ? setReady(true)
        : setReady(false);
    };
    checkData();

    if (!ready) {
      makeSinglePoke(currentSinglePoke)
        .then(setReady(false))
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
        //slight artificial delay for animation
        .then(
          setTimeout(() => {
            setReady(true);
          }, 1000)
        );
      //real-time loading
      // .then(setReady(true));
    }
  }, [globalIndex, singlePokeOpen]);

  //catch cases
  // useEffect(() => {
  //   //index changed and data already saved
  //   // if (!ready) {
  //   //   setReady(true);
  //   // }
  //   //no data in global state, fetch it
  //   if (ready) {
  //     makeSinglePoke(genList[currentDexGen - 1].pokes[globalIndex])
  //       .then(setReady(false))
  //       .then((data) => {
  //         dispatch({
  //           type: "updateSinglePokeUrl",
  //           // newPokemon: (selectedGen.pokes = pokeArr)
  //           updatedNewPokeUrl: data.urldata,
  //         });
  //         dispatch({
  //           type: "updateSinglePokeName",
  //           // newPokemon: (selectedGen.pokes = pokeArr)
  //           updatedNewPokeName: data.namedata,
  //         });
  //       })
  //       //slight artificial delay for animation
  //       .then(
  //         setTimeout(() => {
  //           setReady(true);
  //         }, 1000)
  //       );
  //     //real-time loading
  //     // .then(setReady(true));
  //   }
  // }, [ready]);

  return (
    <>
      {ready ? (
        <Details
          currentSinglePoke={genList[currentDexGen - 1].pokes[globalIndex]}
        />
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default SinglePoke;
