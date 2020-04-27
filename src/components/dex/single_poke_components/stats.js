import React from "react";
import { Grid, makeStyles, Paper, Typography } from "../../../theme/themIndex";
import typeConverter from "../../../utility/typeConverter";
import { useDexContext } from "../../../context/globalContext";

const useStyles = makeStyles((theme) => ({
  gridcard: {
    height: "100%",
    marginBottom: theme.spacing(2),
    background: `linear-gradient(180deg, ${theme.palette.secondary.wrappers.main} 30%, white 30%)`,
    boxShadow: `4px 4px 6px ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius,
    border: `${theme.palette.primary.main} 2px solid`,
    overflow: "hidden",
  },
  card: {
    background: "white",
    textTransform: "uppercase",
    height: "50%",
  },
  cardTitle: {
    height: "30%",
  },
}));

//STATS: abilities/typing matchups, base stats
const Stats = () => {
  const classes = useStyles();
  const [{ genList, currentDexGen, globalIndex }] = useDexContext();
  let currentSinglePoke = genList[currentDexGen - 1].pokes[globalIndex];

  const { abilities, stats, types } = currentSinglePoke.nameUrlObj;

  //for graphical stat card- height and color to max-min ratio
  const statRange = [
    { id: "hp", max: 255, min: 1 },
    { id: "speed", max: 180, min: 5 },
    { id: "attack", max: 190, min: 5 },
    { id: "defense", max: 250, min: 5 },
    { id: "special-defense", max: 250, min: 20 },
    { id: "special-attack", max: 194, min: 10 },
    { id: "total", max: 1125, min: 175 },
  ];

  const allAbilities = [];
  abilities.forEach((a) => {
    let ab = {};
    ab.id = a.ability.name;
    ab.hidden = a.is_hidden = 0 ? false : true;
    ab.url = a.ability.url;
    allAbilities.push(ab);
  });

  const allStats = [];
  let statTotal = 0;
  stats.forEach((a) => {
    let s = {};
    s.id = a.stat.name;
    s.base = a.base_stat;
    statTotal += a.base_stat;
    s.ev = a.effort = 0 ? false : true;
    s.url = a.stat.url;
    allStats.push(s);
  });

  const typings = [];
  types.forEach((t) => typings.push(typeConverter(t.type.name)));

  const statsTextCard = allStats.length && (
    <Grid
      item
      xs={10}
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.gridcard}
    >
      <Grid
        item
        container
        justify="space-around"
        alignItems="center"
        className={classes.cardTitle}
      >
        <Grid item>
          <Typography variant="h4">Stats</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4">Total: {statTotal}</Typography>
        </Grid>
      </Grid>

      <Grid
        item
        container
        spacing={2}
        justify="space-around"
        alignItems="center"
        style={{ flex: "1" }}
      >
        {allStats.map((s) => (
          <Grid
            item
            xs={4}
            container
            direction="column"
            justify="center"
            className={classes.card}
          >
            <Typography variant="body1">{s.id}</Typography>
            <Typography variant="h4">{s.base}</Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );

  return <>{statsTextCard}</>;
};

export default Stats;
