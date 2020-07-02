import React from "react";
import {
  Grid,
  makeStyles,
  Chip,
  Typography,
  Divider,
} from "../../../theme/themIndex";
import typeConverter from "../../../utility/typeConverter";
import { typeNameArray, typesChart } from "../../../utility/typingsMatchup";
import { useDexContext } from "../../../context/globalContext";

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: "100%",
    marginBottom: theme.spacing(2),
    background: `transparent`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: `4px 4px 6px ${theme.palette.primary.dark}`,
    border: `${theme.palette.primary.main} 2px solid`,
    overflow: "hidden",
    padding: "0px !important",
  },
  cardTitle: {
    height: "30%",
    padding: "0px !important",
    border: `8px solid ${theme.palette.secondary.wrappers.main}`,
    borderBottom: "none !important",
    background: `linear-gradient(135deg, white 0%, white 55%, ${theme.palette.secondary.wrappers.main} 55%)`,
  },
  cardInner: {
    flex: "1",
    background: "transparent",
    border: `8px solid ${theme.palette.secondary.wrappers.main}`,
    boxShadow: `inset 2px 2px 3px ${theme.palette.primary.light}, inset -2px -2px 3px ${theme.palette.primary.light}`,
    backdropFilter: "blur(10px)",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  innerCardHeader: {
    textAlign: "center",
    fontStyle: "italic",
    textTransform: "uppercase",
    background: `linear-gradient(135deg, transparent 20%, white 20%, white 80%, transparent 80%)`,
  },
}));

//STATS: abilities/typing matchups, base stats
const Stats = () => {
  const classes = useStyles();
  const [{ genList, currentDexGen, globalIndex }] = useDexContext();
  let currentSinglePoke = genList[currentDexGen - 1].pokes[globalIndex];

  const { stats, types } = currentSinglePoke.nameUrlObj;

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
    //inc by color- red orange yellow green
    let stat = statArr.find((s) => s.id === statName);
    let range = stat.max - stat.min;
    //normalize to the stat being calculated
    let normalized = (statValue - stat.min) / range;
    return Math.round(normalized * 100);
  };

  const calculateStatColor = (percent) => {
    return percent < 20
      ? "#f44336"
      : percent < 40
      ? "#ff9800"
      : percent < 60
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

  const typings = [];
  types.forEach((t) => typings.push(typeConverter(t.type.name)));

  //return a innerCardHeader for each matchups multiplier ([0, .25, .5, 2, 4] = [immune, strongly resists, resists, weak to, very weak to])
  const matchupsArray = [
    {
      multiplier: 0,
      id: "immune",
      types: [], //strings from typesChart
    },
    {
      multiplier: 0.25,
      id: "strongly resists",
      types: [],
    },
    {
      multiplier: 0.5,
      id: "resists",
      types: [],
    },
    {
      multiplier: 2,
      id: "weak",
      types: [],
    },
    {
      multiplier: 4,
      id: "very weak",
      types: [],
    },
  ];
  typings.forEach((type) => {
    //type is object with keys type("type") and hex("#123123")
    let index = typeNameArray.indexOf(type.type);
    //defensive value => load index of each row from typesChart that are not 1
    typesChart.forEach((arr, i) => {
      if (arr[index] !== 1) {
        arr[index] === 0
          ? matchupsArray[0].types.push(typeNameArray[i])
          : arr[index] === 0.5
          ? matchupsArray[2].types.push(typeNameArray[i])
          : matchupsArray[3].types.push(typeNameArray[i]);
      }
    });
  });

  //only 0.5 and 2 multiplier can have multiples
  //if duplicates, push dups to respective object, reduce objects with dups
  //pass in num- the desired index of matchups
  let filtered = (num) => {
    return matchupsArray[num].types.filter(
      (item, index) => matchupsArray[num].types.indexOf(item) === index
    );
  };
  let dups = (num) => {
    return matchupsArray[num].types.filter(
      (item, index) => matchupsArray[num].types.indexOf(item) !== index
    );
  };

  //removes values from f that are in d
  const removeDupsInFilter = (f, d) => {
    let newF = [...f];
    //for each value in d, if f has d, remove it
    d.forEach((val) => {
      let index = newF.indexOf(val);
      index >= 0 && newF.splice(index, 1);
    });
    return newF;
  };
  //filter x0.5 multiplier, make x0.25
  if (dups(2).length) {
    matchupsArray[1].types = dups(2);
    matchupsArray[2].types = filtered(2);
    matchupsArray[2].types = removeDupsInFilter(
      matchupsArray[2].types,
      matchupsArray[1].types
    );
  }
  //filter x2 multiplier, make x4
  if (dups(3).length) {
    matchupsArray[4].types = dups(3);
    matchupsArray[3].types = filtered(3);
    matchupsArray[3].types = removeDupsInFilter(
      matchupsArray[3].types,
      matchupsArray[4].types
    );
  }
  //find values found in both x0.5 and x2- they equal 1 and remove from each
  const filterTwoArrays = () => {
    let halfDoubles = [...matchupsArray[2].types, ...matchupsArray[3].types];
    let f = halfDoubles.filter(
      (item, index) => halfDoubles.indexOf(item) !== index
    );
    if (f.length) {
      matchupsArray[2].types = removeDupsInFilter(matchupsArray[2].types, f);
      matchupsArray[3].types = removeDupsInFilter(matchupsArray[3].types, f);
    }
  };
  filterTwoArrays();

  const matchupsCard = (
    <Grid
      item
      xs={11}
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.card}
      id="matchups-card"
    >
      <Grid
        item
        container
        justify="space-between"
        alignItems="center"
        className={classes.cardTitle}
      >
        <Grid
          item
          style={{
            paddingLeft: "16px",
            paddingBottom: "8px",
            paddingTop: "8px",
          }}
        >
          <Typography variant="h4">Type Matchups</Typography>
        </Grid>
      </Grid>

      <Grid
        item
        container
        justify="center"
        alignItems="center"
        className={classes.cardInner}
        style={{ alignContent: "space-evenly" }}
      >
        {matchupsArray.map(
          (m) =>
            m.types.length > 0 && (
              <Grid
                key={m.id}
                item
                xs={10}
                container
                direction="column"
                justify="space-evenly"
                style={{ height: "120px" }}
              >
                <Typography variant="h5" className={classes.innerCardHeader}>
                  {m.id}
                  <Chip
                    variant="outlined"
                    disabled
                    label={`x${m.multiplier.toString()}`}
                    style={{ position: "absolute", left: "80%" }}
                  />
                </Typography>

                <Typography variant="h6">
                  {m.types.map((t) => (
                    <Chip
                      key={t}
                      variant="outlined"
                      label={t}
                      style={{
                        backgroundColor: typeConverter(t).hex,
                        marginLeft: "8px",
                        marginRight: "8px",
                      }}
                    />
                  ))}
                </Typography>
              </Grid>
            )
        )}
      </Grid>
    </Grid>
  );

  const statsTextCard = allStats.length && (
    <Grid
      item
      xs={11}
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.card}
      id="stats-card"
    >
      <Grid
        item
        container
        justify="space-between"
        alignItems="center"
        className={classes.cardTitle}
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
        className={classes.cardInner}
      >
        {allStats.map((s) => (
          <Grid
            key={s.id}
            item
            xs={4}
            container
            direction="column"
            justify="center"
            style={{
              textTransform: "uppercase",
              marginTop: "16px",
            }}
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
          style={{ textTransform: "uppercase", marginTop: "16px" }}
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
        <Grid item xs={10} style={{ paddingTop: "16px" }}>
          <Divider
            style={{
              marginTop: "8px",
              marginBottom: "8px",
            }}
          />
          <Typography variant="subtitle2">
            {"*normalized to <20, <40, <60, >60 percentile of each stat"}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <>
      {statsTextCard}
      {matchupsCard}
    </>
  );
};

export default Stats;
