import React from "react";
import { Grid, makeStyles, Paper, Typography } from "../../../theme/themIndex";
import typeConverter from "../../../utility/typeConverter";
import { useDexContext } from "../../../context/globalContext";

const useStyles = makeStyles((theme) => ({
  gridcard: {
    marginBottom: theme.spacing(2),
    background: theme.palette.secondary.wrappers.main,
    boxShadow: `4px 4px 6px ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius,
    border: `${theme.palette.primary.main} 2px solid`,
    overflow: "hidden",
  },
  card: {
    background: "white",
    border: `${theme.palette.primary.main} 2px solid`,
    boxShadow: `inset 2px 2px 3px ${theme.palette.primary.dark}, inset -2px -2px 3px ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius,
    maxHeight: "100%",
  },
}));

//STATS: abilities/typing matchups, base stats
const Stats = () => {
  const classes = useStyles();
  const [{ genList, currentDexGen, globalIndex }] = useDexContext();
  let currentSinglePoke = genList[currentDexGen - 1].pokes[globalIndex];

  const { abilities, stats, types } = currentSinglePoke.nameUrlObj;

  const typings = [];
  types.forEach((t) => typings.push(typeConverter(t.type.name)));

  console.log(currentSinglePoke);

  return (
    <>
      <Grid item xs={12}>
        <Grid item xs={9} className={classes.gridcard} id="abilities">
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            className={classes.cardTitle}
          >
            <Typography variant="h4">abilities</Typography>
          </Grid>
          <Paper className={classes.card}></Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Stats;
