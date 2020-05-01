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
    padding: "0px !important",
    marginBottom: theme.spacing(2),
    background: "transparent",
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

  const { nameUrlObj } = currentSinglePoke;

  //global state has been updated from array of objects to object of game objects
  let movesAlreadySorted = !Array.isArray(nameUrlObj.moves);
  // movesAlreadySorted && console.log(nameUrlObj);
  // movesAlreadySorted && console.log(urlObj);

  useEffect(() => {
    //turn initial arrray of moves into game objects
    if (!movesAlreadySorted) {
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

  const gameButtons =
    movesAlreadySorted &&
    games.map((g) => (
      <Grid item key={g}>
        <Chip
          color="primary"
          variant={g !== activeGen ? "outlined" : "default"}
          clickable
          onClick={handleClick(g)}
          label={g}
          disabled={!currentSinglePoke.nameUrlObj.moves.hasOwnProperty(g)}
        />
      </Grid>
    ));

  //simple expansion panel for levelup, tm, and egg moves
  //each panel has a sorted table, row for each move in panel

  //makeSomething creates array to pass into enhanced table,

  /////////Due to api structure, move data must be fetched for each move (TOO MANY FETCHES!) skip this for now
  //need to structure for row making, pass into createData in sortedTable component
  //Make a function (makeMachineMoves) that creates an array of objects-
  //an object for each move with keys of name,type,category,power,acc,prio,pp,descrip
  //then pass into <EnhancedTable />

  const makeMachineMoves = [
    {
      name: "movename",
      type: "fire",
      category: "physical",
      power: 80,
      acc: 100,
      prio: 0,
      pp: 10,
      descrip: "flavor text entry",
    },
  ];

  return (
    <>
      <Grid
        item
        xs={11}
        spacing={1}
        container
        justify="center"
        style={{ marginBottom: "16px" }}
      >
        {gameButtons}
      </Grid>

      <Grid item xs={12} className={classes.gridcard}>
        <ExpansionPanel elevation={0}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="levelup-moves"
            id="levelup-moves"
          >
            <Typography variant="h4">Level-Up Moves</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <EnhancedTable
              id="Level-Up Moves"
              makeMovesObj={makeMachineMoves}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>

      <Grid item xs={12} className={classes.gridcard}>
        <ExpansionPanel elevation={0}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="machine-moves"
            id="machine-moves"
          >
            <Typography variant="h4">TM Moves</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <EnhancedTable id="TM Moves" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>

      <Grid item xs={12} className={classes.gridcard}>
        <ExpansionPanel elevation={0}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="egg-moves"
            id="egg-moves"
          >
            <Typography variant="h4">Egg Moves</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <EnhancedTable id="Egg Moves" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </>
  );
};

export default Moves;
