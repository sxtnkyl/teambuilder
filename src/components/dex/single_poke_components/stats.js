import React from "react";
import { Grid, makeStyles, Chip, Typography } from "../../../theme/themIndex";
import typeConverter from "../../../utility/typeConverter";
import { useDexContext } from "../../../context/globalContext";

const useStyles = makeStyles((theme) => ({
  gridcard: {
    minHeight: "100%",
    marginBottom: theme.spacing(2),
    background: `transparent`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: `4px 4px 6px ${theme.palette.primary.dark}`,
    border: `${theme.palette.primary.main} 2px solid`,
    overflow: "hidden",
    padding: "0px !important",
  },
  gridCardTitle: {
    height: "30%",
    padding: "0px !important",
    border: `8px solid ${theme.palette.secondary.wrappers.main}`,
    borderBottom: "none !important",
    background: `linear-gradient(135deg, white 0%, white 33%, ${theme.palette.secondary.wrappers.main} 33%)`,
  },
  gridCardInner: {
    flex: "1",
    background: "transparent",
    border: `8px solid ${theme.palette.secondary.wrappers.main}`,
    boxShadow: `inset 2px 2px 3px ${theme.palette.primary.light}, inset -2px -2px 3px ${theme.palette.primary.light}`,
    backdropFilter: "blur(5px)",
  },
  innerCardHeader: {
    textAlign: "center",
    fontStyle: "italic",
    textTransform: "uppercase",
    background: `linear-gradient(135deg, transparent 20%, white 20%, white 80%, transparent 80%)`,
    width: "100%",
    marginTop: "8px",
    marginBottom: "16px",
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

  const calculateStatPercent = (statName, statValue, statArr) => {
    //0-24, 25-49, 50-74, 75-100%: red yellow light-green green MUI palette 500s
    //#f44336, #ffeb3b, #8bc34a, #4caf50
    let stat = statArr.find((s) => s.id === statName);
    let range = stat.max - stat.min;
    return Math.round((statValue / range) * 100);
  };

  const calculateStatColor = (percent) => {
    return percent < 25
      ? "#f44336"
      : percent < 50
      ? "#ff9800"
      : percent < 75
      ? "#ffeb3b"
      : "#4caf50";
  };

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
  allStats.forEach((s) => {
    s.percent = calculateStatPercent(s.id, s.base, statRange);
    s.color = calculateStatColor(s.percent);
  });
  let totalColor = calculateStatColor(
    calculateStatPercent("total", statTotal, statRange)
  );

  //need to fetch ability descrips
  const allAbilities = [];
  abilities.forEach((a) => {
    let ab = {};
    ab.id = a.ability.name;
    ab.hidden = a.is_hidden;
    ab.url = a.ability.url;
    allAbilities.push(ab);
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
        justify="space-between"
        alignItems="center"
        className={classes.gridCardTitle}
      >
        <Grid
          item
          style={{
            paddingLeft: "16px",
            paddingBottom: "8px",
            paddingTop: "8px",
          }}
        >
          <Typography variant="h4">Stats</Typography>
        </Grid>
      </Grid>

      <Grid
        item
        container
        justify="space-around"
        alignItems="center"
        className={classes.gridCardInner}
      >
        {allStats.map((s) => (
          <Grid
            item
            xs={4}
            container
            direction="column"
            justify="center"
            style={{ textTransform: "uppercase", height: "40%" }}
          >
            <Typography variant="body1">{s.id}</Typography>
            <Typography
              variant="h4"
              style={{
                background: `linear-gradient(135deg, transparent 25%, ${s.color} 25%, ${s.color} 75%, transparent 75%)`,
              }}
            >
              {s.base}
            </Typography>
          </Grid>
        ))}
        <Grid
          item
          xs={4}
          container
          direction="column"
          justify="center"
          style={{ textTransform: "uppercase", height: "40%" }}
        >
          <Typography variant="body1">Total</Typography>
          <Typography
            variant="h4"
            style={{
              background: `linear-gradient(135deg, transparent 25%, ${totalColor} 25%, ${totalColor} 75%, transparent 75%)`,
            }}
          >
            {statTotal}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  const abilitiesCard = allAbilities.length && (
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
        justify="space-between"
        alignItems="center"
        className={classes.gridCardTitle}
      >
        <Grid
          item
          style={{
            paddingLeft: "16px",
            paddingBottom: "8px",
            paddingTop: "8px",
          }}
        >
          <Typography variant="h4">Abilities</Typography>
        </Grid>
      </Grid>

      <Grid
        item
        container
        justify="space-around"
        alignItems="center"
        className={classes.gridCardInner}
      >
        {allAbilities.map((a) => (
          <Grid
            item
            xs={10}
            container
            direction="column"
            justify="center"
            style={{ marginTop: "16px", marginBottom: "16px" }}
          >
            <Typography variant="h5" className={classes.innerCardHeader}>
              {a.id}
              {a.hidden && (
                <Chip
                  variant="outlined"
                  disabled
                  label="hidden"
                  style={{ position: "absolute", left: "80%" }}
                />
              )}
            </Typography>

            <Typography variant="body1">
              - some fil text some fil text some fil text some fil text some fil
              text some fil text some fil text some fil text some fil text
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );

  return (
    <>
      {statsTextCard}
      {abilitiesCard}
    </>
  );
};

export default Stats;
