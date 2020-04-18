import React, { useState, useEffect, useRef } from "react";
import { animated, useSpring, config } from "react-spring";
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

const useStyles = makeStyles((theme) => ({
  spritecard: {
    height: "80%",
    marginBottom: theme.spacing(2),
    // background: `linear-gradient(180deg, ${theme.palette.secondary.wrappers.main} 30%, white 30%)`,
    background: `linear-gradient(140deg, ${theme.palette.secondary.wrappers.main} 0%, white 10%, white 90%, ${theme.palette.secondary.wrappers.main} 100%)`,
    boxShadow: `4px 4px 6px ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(2),
    border: `${theme.palette.primary.main} 3px solid`,
    overflow: "hidden",
  },
  sprite: {
    background: "white",
    border: `${theme.palette.primary.main} 2px solid`,
    boxShadow: `inset 2px 2px 3px ${theme.palette.primary.dark}, inset -2px -2px 3px ${theme.palette.primary.dark}`,
    borderRadius: theme.spacing(2),
    maxHeight: "100%",
  },
  full: {
    height: "100%",
    width: "100%",
  },
  cardTitle: {
    minHeight: "30%",
  },
  // frosty: {
  //   boxShadow: `inset 2px 2px 3px ${theme.palette.primary.dark}, inset -2px -2px 3px ${theme.palette.primary.dark}`,
  //   borderRadius: theme.spacing(2),
  //   maxHeight: "100%",
  //   backdropFilter: "blur(5px)",
  // },
}));

//DETAILS: sprite(forms)/name/height/weight/typing, flavor texts(foreach obj => obj.language.name == 'en'), evo chain
const BasicInfo = () => {
  const classes = useStyles();
  const [{ genList, currentDexGen, globalIndex }, dispatch] = useDexContext();
  let currentSinglePoke = genList[currentDexGen - 1].pokes[globalIndex];

  const { img, dexNo, name, nameUrlObj, urlObj } = currentSinglePoke;

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
  }, []);

  function heightAdjuster(num) {
    let str = num.toString();
    if (str.length === 1) {
      return `0.${str} m`;
    }
    if (str.length === 2) {
      return `${str[0]}.${str[1]} m`;
    } else return `${str[0]}${str[1]}.${str[2]} m`;
  }
  const meterHeight = heightAdjuster(78);

  const typings = [];
  nameUrlObj.types.forEach((t) => typings.push(typeConverter(t.type.name)));

  const [textIndex, setIndex] = useState(0);
  const handleNext = () => {
    textIndex < processedTexts.length &&
      setIndex((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    textIndex > 0 && setIndex((prevActiveStep) => prevActiveStep - 1);
  };

  //////for future animation use, swipable-views
  //transition, if > textIndex transition neg, else pos
  // function usePrevious(value) {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // }
  // const prevIndex = usePrevious(textIndex);
  // const handleSlideDirection = prevIndex < textIndex ? "right" : "left";

  const flavorTextCard = processedTexts && (
    <Grid item xs={9} justify="center" container className={classes.spritecard}>
      <Grid
        item
        xs={10}
        container
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          className={classes.cardTitle}
        >
          <Typography variant="h3">Descriptions</Typography>
        </Grid>

        <Grid
          item
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          style={{ flex: "1" }}
        >
          <Typography variant="h6">
            {processedTexts[textIndex].flavor_text}
          </Typography>
          <Typography variant="h6" style={{ textTransform: "uppercase" }}>
            {processedTexts[textIndex].version.name}
          </Typography>
        </Grid>

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
  );

  return (
    <>
      <Grid item xs={9} container className={classes.spritecard}>
        <Grid item xs={6} className={classes.sprite}>
          <img
            className={classes.full}
            src={currentSinglePoke.img}
            alt="sprite"
          />
        </Grid>
        <Grid item xs={6} container direction="column" justify="space-between">
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            className={classes.cardTitle}
          >
            <Typography variant="h3">{currentSinglePoke.name}</Typography>
          </Grid>

          <Grid
            item
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            style={{ flex: "1" }}
          >
            <Typography variant="body1">#{currentSinglePoke.dexNo}</Typography>
            <Typography variant="h6">Height: {meterHeight}</Typography>
            <Typography variant="h6">
              Weight: {currentSinglePoke.nameUrlObj.weight} kg
            </Typography>
            <Typography variant="h6">
              Typings:{" "}
              {typings.map((t) => (
                <Chip
                  key={t.type}
                  style={{ backgroundColor: t.hex, marginLeft: "8px" }}
                  label={t.type}
                />
              ))}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {processedTexts ? flavorTextCard : ""}
    </>
  );
};

export default BasicInfo;
