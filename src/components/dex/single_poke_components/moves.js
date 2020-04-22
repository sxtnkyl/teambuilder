import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Chip,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpandMoreIcon,
} from "../../../theme/themIndex";
import { useDexContext } from "../../../context/globalContext";
import EnhancedTable from "./sortedTable";

const useStyles = makeStyles((theme) => ({
  gridcard: {
    marginBottom: theme.spacing(2),
    background: theme.palette.secondary.wrappers.main,
    boxShadow: `4px 4px 6px ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius,
    border: `${theme.palette.primary.main} 2px solid`,
    overflow: "hidden",
  },
  buttons: {
    border: `1px solid ${theme.palette.secondary.light}`,
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  cardTitle: {
    height: "30%",
  },
}));

const Moves = () => {
  const classes = useStyles();
  const [{ genList, currentDexGen, globalIndex }, dispatch] = useDexContext();
  let currentSinglePoke = genList[currentDexGen - 1].pokes[globalIndex];

  const { nameUrlObj, urlObj } = currentSinglePoke;

  //global state has been updated from array of objects to object of game objects
  let movesAlreadySorted = Array.isArray(nameUrlObj.moves);
  // movesAlreadySorted && console.log(nameUrlObj);
  // movesAlreadySorted && console.log(urlObj);

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

  //simple expansion panel for levelup, tm, and egg
  //each panel has a sorted table, row for each move in panel,
  //columns = (name/type/power/acc)class/pp/descrip
  //need to make fetch req for each move....YIKES!

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

  const makeEggMoves =
    !movesAlreadySorted &&
    currentSinglePoke.nameUrlObj.moves[activeGen]["egg"].length
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
      : "no egg moves";

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
      <Grid item xs={12} className={classes.gridcard}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="levelup-moves"
            id="levelup-moves"
          >
            <Typography variant="h5">Level-Up Moves</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <EnhancedTable id="Level-Up Moves" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      {/* <Grid item xs={10} className={classes.gridcard}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="levelup-moves"
            id="levelup-moves"
          >
            <Typography variant="h5">Level-Up Moves</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{makeLevelupMoves}</ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <Grid item xs={10} className={classes.gridcard}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="machine-moves"
            id="machine-moves"
          >
            <Typography variant="h5">Machine Moves</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{makeMachineMoves}</ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <Grid item xs={10} className={classes.gridcard}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="egg-moves"
            id="egg-moves"
          >
            <Typography variant="h5">Egg Moves</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{makeEggMoves}</ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid> */}
    </>
  );
};

export default Moves;
