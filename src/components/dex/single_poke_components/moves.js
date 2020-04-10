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

//MOVES: display by game version
//moves by levelup, tm, egg
//expand to see individual (name/type/power/acc)class/pp/descrip
const Moves = () => {
  const classes = useStyles();
  const [{ genList, currentDexGen, globalIndex }, dispatch] = useDexContext();
  let currentSinglePoke = genList[currentDexGen - 1].pokes[globalIndex];

  const { nameUrlObj, urlObj } = currentSinglePoke;

  const [games, setGames] = useState(null);
  useEffect(() => {
    let moves = nameUrlObj.moves;
    //unnecessary sorting, but good for practice!
    //initial sort of moves by game version
    function makeGameVersionMovesets(arr) {
      const byGameVersion = {};
      Array.isArray(arr) &&
        arr.forEach((element) => {
          element.version_group_details.forEach((version) => {
            if (!byGameVersion.hasOwnProperty(version.version_group.name)) {
              byGameVersion[version.version_group.name] = {};
              byGameVersion[version.version_group.name][
                element.move.name
              ] = version;
              byGameVersion[version.version_group.name][element.move.name].url =
                element.move.url;
            } else
              byGameVersion[version.version_group.name][
                element.move.name
              ] = version;
            byGameVersion[version.version_group.name][element.move.name].url =
              element.move.url;
          });
        });
      return byGameVersion;
    }
    const sortedByGame = makeGameVersionMovesets(moves);

    //sorts a game object by key 'move_learn_method'
    function sortedByLearnMethod(obj) {
      const sortedByLearnMethod = { levelup: {}, machine: {}, egg: {} };
      Object.entries(obj).forEach(([move, data]) => {
        data.move_learn_method.name === "level-up"
          ? (sortedByLearnMethod.levelup[move] = data)
          : data.move_learn_method.name === "machine"
          ? (sortedByLearnMethod.machine[move] = data)
          : (sortedByLearnMethod.egg[move] = data);
      });
      return sortedByLearnMethod;
    }

    //sorts each game's moves by learn method
    const gamesSortedByLearnMethod = (obj) => {
      const newSortedByGame = {};
      Object.entries(obj).forEach(([game, data]) => {
        newSortedByGame[game] = sortedByLearnMethod(data);
      });
      return newSortedByGame;
    };
    const newSortedByGame = gamesSortedByLearnMethod(sortedByGame);

    //replace global state nameUrlObj.moves
    dispatch({ type: "updateSingleMoveset", updatedMoveset: newSortedByGame });

    setGames(Object.keys(sortedByGame));
    console.log(currentSinglePoke.nameUrlObj.moves);
  }, []);

  return (
    <>
      {/* <Grid item xs={12} className={classes.gridcard}>
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
      </Grid> */}
    </>
  );
};

export default Moves;
