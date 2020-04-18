import React, { useState, useEffect } from "react";
import { animated, useSpring, config } from "react-spring";
import {
  Grid,
  makeStyles,
  Paper,
  Typography,
  Chip,
} from "../../../theme/themIndex";
import { useDexContext } from "../../../context/globalContext";

const useStyles = makeStyles((theme) => ({
  gridcard: {
    marginBottom: theme.spacing(2),
    background: `linear-gradient(180deg, ${theme.palette.secondary.wrappers.main} 30%, white 30%)`,
    boxShadow: `4px 4px 6px ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(2),
    border: `${theme.palette.primary.main} 3px solid`,
    overflow: "hidden",
  },
  card: {
    background: "white",
    border: `${theme.palette.primary.main} 2px solid`,
    boxShadow: `inset 2px 2px 3px ${theme.palette.primary.dark}, inset -2px -2px 3px ${theme.palette.primary.dark}`,
    borderRadius: theme.spacing(2),
    maxHeight: "100%",
  },
  buttons: {
    border: `1px solid ${theme.palette.secondary.light}`,
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
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

  //global state has been updated from array of objects to object of game objects
  let movesAlreadySorted = Array.isArray(nameUrlObj.moves);
  movesAlreadySorted && console.log(nameUrlObj);
  movesAlreadySorted && console.log(urlObj);

  useEffect(() => {
    //turn initial arrray of moves into game objects
    if (movesAlreadySorted) {
      let moves = nameUrlObj.moves;
      //unnecessary sorting, but good for practice!
      //initial sort of moves by game version
      function makeGameVersionMovesets(arr) {
        const byGameVersion = {};
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

      //sorts a single game object by key 'move_learn_method'
      function sortedByLearnMethod(obj) {
        const sortedByLearnMethod = { levelup: [], machine: [], egg: [] };
        Object.entries(obj).forEach(([move, data]) => {
          data.id = move;
          if (data.move_learn_method.name === "level-up") {
            sortedByLearnMethod.levelup.push(data);
          }
          if (data.move_learn_method.name === "machine") {
            sortedByLearnMethod.machine.push(data);
          }
          if (data.move_learn_method.name === "egg") {
            sortedByLearnMethod.egg.push(data);
          }
        });
        return sortedByLearnMethod;
      }

      //sorts all game's moves by learn method
      const gamesSortedByLearnMethod = (obj) => {
        const newSortedByGame = {};
        Object.entries(obj).forEach(([game, data]) => {
          newSortedByGame[game] = sortedByLearnMethod(data);
        });
        return newSortedByGame;
      };
      const newSortedByGame = gamesSortedByLearnMethod(sortedByGame);

      //replace global state nameUrlObj.moves
      dispatch({
        type: "updateSingleMoveset",
        updatedMoveset: newSortedByGame,
      });
    }
  }, []);

  const games = [
    "crystal",
    "gold-silver",
    "omega-ruby-alpha-sapphire",
    "x-y",
    "black-2-white-2",
    "black-white",
    "heartgold-soulsilver",
    "platinum",
    "diamond-pearl",
    "ultra-sun-ultra-moon",
    "sun-moon",
    "firered-leafgreen",
    "emerald",
    "yellow",
    "red-blue",
    "xd",
    "ruby-sapphire",
    "colosseum",
  ];

  const [activeGen, setActiveGen] = useState("ultra-sun-ultra-moon");

  const handleClick = (label) => (event) => {
    let newGen = label;
    setActiveGen(newGen);
  };

  const gameButtons = games.map((g) => (
    <Grid item key={g}>
      <Chip
        color="primary"
        variant={g !== activeGen ? "outlined" : "default"}
        clickable
        onClick={handleClick(g)}
        label={g}
      />
    </Grid>
  ));

  const makeLevelupMoves = !movesAlreadySorted
    ? currentSinglePoke.nameUrlObj.moves[activeGen]["levelup"]
        .sort((a, b) => {
          let x = a.level_learned_at;
          let y = b.level_learned_at;
          // Compare the 2 keys
          return x < y ? -1 : x > y ? 1 : 0;
        })
        .map((m) => {
          return (
            <Typography key={m.id}>
              {m.level_learned_at}, {m.id}
            </Typography>
          );
        })
    : "loading";

  const makeMachineMoves = !movesAlreadySorted
    ? currentSinglePoke.nameUrlObj.moves[activeGen]["machine"]
        .sort((a, b) => {
          let x = a.id;
          let y = b.id;
          // Compare the 2 keys
          return x < y ? -1 : x > y ? 1 : 0;
        })
        .map((m) => {
          return <Typography key={m.id}>{m.id}</Typography>;
        })
    : "loading";

  const makeEggMoves = !movesAlreadySorted
    ? currentSinglePoke.nameUrlObj.moves[activeGen]["egg"]
        .sort((a, b) => {
          let x = a.id;
          let y = b.id;
          // Compare the 2 keys
          return x < y ? -1 : x > y ? 1 : 0;
        })
        .map((m) => {
          return <Typography key={m.id}>{m.id}</Typography>;
        })
    : "loading";

  return (
    <>
      <Grid
        item
        xs={12}
        spacing={1}
        container
        justify="center"
        style={{ marginBottom: "16px" }}
      >
        {gameButtons}
      </Grid>
      <Grid item xs={9} className={classes.gridcard} id="levelup-moves">
        <Paper className={classes.card}>{makeLevelupMoves}</Paper>
      </Grid>
      <Grid item xs={9} className={classes.gridcard} id="machine-moves">
        <Paper className={classes.card}>{makeMachineMoves}</Paper>
      </Grid>
      <Grid item xs={9} className={classes.gridcard} id="egg-moves">
        <Paper className={classes.card}>{makeEggMoves}</Paper>
      </Grid>
    </>
  );
};

export default Moves;
