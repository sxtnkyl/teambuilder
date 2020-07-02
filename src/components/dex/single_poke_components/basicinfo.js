import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Button,
  MobileStepper,
  KeyboardArrowRight,
  KeyboardArrowLeft,
  Chip,
} from "../../../theme/themIndex";
import typeConverter from "../../../utility/typeConverter";
import { useDexContext } from "../../../context/globalContext";
import abilityJSON from "../../../utility/abilityAndMoves.json";

const useStyles = makeStyles((theme) => ({
  spriteCard: {
    height: "100%",
    marginBottom: theme.spacing(2),
    background: `linear-gradient(180deg, ${theme.palette.secondary.wrappers.main} 30%, white 30%)`,
    boxShadow: `4px 4px 6px ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius,
    border: `${theme.palette.primary.main} 2px solid`,
    overflow: "hidden",
  },
  sprite: {
    background: "white",
    border: `${theme.palette.primary.main} 2px solid`,
    boxShadow: `inset 2px 2px 3px ${theme.palette.primary.light}, inset -2px -2px 3px ${theme.palette.primary.light}`,
    borderRadius: theme.shape.borderRadius,
    maxHeight: "100%",
  },
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
    width: "100%",
    marginTop: "8px",
    marginBottom: "16px",
  },
}));

//DETAILS: sprite(forms)/name/height/weight/typing, flavor texts(foreach obj => obj.language.name == 'en'), abilities
const BasicInfo = () => {
  const classes = useStyles();
  const [{ genList, currentDexGen, globalIndex }] = useDexContext();
  let currentSinglePoke = genList[currentDexGen - 1].pokes[globalIndex];

  const { img, name, nameUrlObj, urlObj } = currentSinglePoke;
  const { abilities, types } = currentSinglePoke.nameUrlObj;

  const [processedTexts, setTexts] = useState(null);
  //make all the filter texts (english only, remove \n regex, filter duplicates)
  useEffect(() => {
    let allFlavorTexts = [];

    //get english entries
    urlObj.flavor_text_entries.forEach(
      (t) => t.language.name === "en" && allFlavorTexts.push(t)
    );

    //remove the line feed (10) character for flavor texts, remove spaces
    allFlavorTexts.forEach((t) => {
      let newString = JSON.stringify(t.flavor_text)
        .replace(new RegExp(/\\n/, `g`), ` `)
        //find all periods, neg lookahead is letter, add a space
        .replace(new RegExp(/\\.(?!\s)/, `g`), ` `);
      t.flavor_text = JSON.parse(newString);
    });

    setTexts(allFlavorTexts);
  }, [urlObj.flavor_text_entries]);

  const findGenera = () => {
    let index = urlObj.genera.findIndex((i) => i.language.name === "en");
    return urlObj.genera[index].genus;
  };
  const generaText = findGenera();

  function heightAdjuster(num) {
    let str = num.toString();
    if (str.length === 1) {
      return `0.${str} m`;
    }
    if (str.length === 2) {
      return `${str[0]}.${str[1]} m`;
    } else return `${str[0]}${str[1]}.${str[2]} m`;
  }
  const meterHeight = heightAdjuster(nameUrlObj.height);

  //need to fetch ability descrips
  const allAbilities = [];
  abilities.forEach((a) => {
    let ab = {};
    ab.id = a.ability.name;
    ab.hidden = a.is_hidden;
    ab.data = abilityJSON.abilities.list[a.ability.name].data;
    allAbilities.push(ab);
  });

  const typings = [];
  types.forEach((t) => typings.push(typeConverter(t.type.name)));

  const [textIndex, setIndex] = useState(0);
  const handleNext = () => {
    textIndex < processedTexts.length &&
      setIndex((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    textIndex > 0 && setIndex((prevActiveStep) => prevActiveStep - 1);
  };

  const abilitiesCard = allAbilities.length && (
    <Grid
      item
      xs={11}
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.card}
      id="abilities-card"
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
          <Typography variant="h4">Abilities</Typography>
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
        {allAbilities.map((a) => (
          <Grid
            key={a.id}
            item
            xs={10}
            container
            direction="column"
            justify="center"
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

            <Typography variant="body1" style={{ textTransform: "none" }}>
              {a.data}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );

  const flavorTextCard = processedTexts && (
    <Grid
      item
      xs={11}
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.card}
      style={{ minHeight: "80%" }}
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
          <Typography variant="h4">Text Entries</Typography>
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction="column"
        alignItems="center"
        className={classes.cardInner}
      >
        <Grid
          item
          xs={10}
          container
          direction="column"
          style={{ marginTop: "16px", marginBottom: "16px", flex: 1 }}
        >
          <Grid item>
            <Typography variant="h5" className={classes.innerCardHeader}>
              {processedTexts[textIndex].version.name}
            </Typography>
          </Grid>

          <Grid
            item
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" style={{ textTransform: "none" }}>
              {processedTexts[textIndex].flavor_text}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={10} style={{ marginTop: "8px", marginBottom: "8px" }}>
          <MobileStepper
            steps={processedTexts.length}
            position="static"
            variant="dots"
            activeStep={textIndex}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={textIndex === processedTexts.length - 1}
              >
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={textIndex === 0}
              >
                <KeyboardArrowLeft />
              </Button>
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Grid
        item
        xs={11}
        container
        justify="space-around"
        className={classes.spriteCard}
        id="sprite-card"
      >
        <Grid item xs={6} className={classes.sprite}>
          <img
            style={{
              height: "100%",
              width: "100%",
            }}
            src={img}
            alt="sprite"
          />
        </Grid>
        <Grid item xs={6} container direction="column" justify="space-between">
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            style={{ height: "30%" }}
          >
            <Typography variant="h4">{name}</Typography>
          </Grid>

          <Grid
            item
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            style={{ flex: "1" }}
          >
            <Typography variant="h6">{generaText}</Typography>
            <Typography variant="h6">Height: {meterHeight}</Typography>
            <Typography variant="h6">Weight: {nameUrlObj.weight} kg</Typography>
            <Typography variant="h6">
              Typings:{" "}
              {typings.map((t) => (
                <Chip
                  key={t.type}
                  variant="outlined"
                  style={{ backgroundColor: t.hex, marginLeft: "8px" }}
                  label={t.type}
                />
              ))}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {abilitiesCard}
      {processedTexts ? flavorTextCard : ""}
    </>
  );
};

export default BasicInfo;
