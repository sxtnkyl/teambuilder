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

  useEffect(() => {
    //turn initial arrray of moves into "game-name": {}
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

      //sorts a single game object 'game-name':{learn_method: []}
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

      //update global state nameUrlObj.moves
      dispatch({
        type: "updateSingleMoveset",
        updatedMoveset: newSortedByGame,
      });
    }
  }, [movesAlreadySorted, nameUrlObj.moves, dispatch]);

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

  const handleGenClick = (label) => (event) => {
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
          onClick={handleGenClick(g)}
          label={g}
          disabled={!currentSinglePoke.nameUrlObj.moves.hasOwnProperty(g)}
        />
      </Grid>
    ));

  /////////Due to api structure, too may calls to get all moves- made own json for simple lookup

  //currentMovset is {learnMehtod: [{id(movename), level_learned_at, move_learn_method:{name, url(learnmethod)}, url(move), version_group:{name} }...]
  //pass to <EnhancedTable />
  let currentMoveset = nameUrlObj.moves[activeGen];

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
      {currentMoveset ? (
        <>
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
                  moveset={currentMoveset.levelup}
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
                <EnhancedTable id="TM Moves" moveset={currentMoveset.machine} />
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
                <EnhancedTable id="Egg Moves" moveset={currentMoveset.egg} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </>
      ) : (
        "loading..."
      )}
    </>
  );
};

export default Moves;
