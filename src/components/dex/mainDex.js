import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "../../theme/themIndex";
import theme from "../../theme/muiTheme";
import SpriteSide from "./spriteSide";
import ListSide from "./listSide";

const useStyles = makeStyles(theme => ({
  container: {
    background: "",
    borderRadius: theme.shape.borderRadius * 2,
    justifyContent: "center"
  },
  leftHalf: {
    background: "",
    maxHeight: "100%"
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2)
  },
  rightHalf: {
    background: "",
    maxHeight: "100%"
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2)
  }
}));

////gets a list of 20 pokes, number, spriteUrl, api url

const slides = [
  {
    dexNo: 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`,
    name: "bulbasaur"
  },
  {
    dexNo: 2,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png`,
    name: "ivysaur"
  },
  {
    dexNo: 3,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png`,
    name: "venosaur"
  },
  {
    dexNo: 4,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png`,
    name: "charmander"
  },
  {
    dexNo: 5,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png`,
    name: "charmeleon"
  },
  {
    dexNo: 6,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png`,
    name: "charizard"
  },
  {
    dexNo: 7,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png`,
    name: "squirtle"
  },
  {
    dexNo: 8,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png`,
    name: "wartortle"
  },
  {
    dexNo: 9,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png`,
    name: "blastoise"
  },
  {
    dexNo: 10,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png`,
    name: "caterpie"
  },
  {
    dexNo: 11,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png`,
    name: "asdf"
  },
  {
    dexNo: 12,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png`,
    name: "venosdfgsaur"
  },
  {
    dexNo: 13,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png`,
    name: "chadfhgjrmander"
  },
  {
    dexNo: 14,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png`,
    name: "tretruy"
  },
  {
    dexNo: 15,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png`,
    name: "dfghfdg"
  },
  {
    dexNo: 16,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png`,
    name: "qwewqr"
  },
  {
    dexNo: 17,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png`,
    name: "bnmvbn"
  },
  {
    dexNo: 18,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png`,
    name: "poiupoiu"
  }
];

const Dex = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadiusSprite: 2,
    offsetRadiusList: 4,
    index: 0,
    showNavigation: true
  });

  //////need to set limit on renders//////
  //pass 1 or -1 as direction
  const moveSlide = direction => {
    setState({
      ...state,
      // goToSlide: null,
      index: modBySlidesLength(state.index + direction)
    });
  };

  function mod(a, b) {
    // console.log(a, b, a % b, (a % b) + b, ((a % b) + b) % b);
    return ((a % b) + b) % b;
  }

  const modBySlidesLength = index => {
    return mod(index, slides.length);
  };

  return (
    <Grid container className={classes.container}>
      <Grid
        item
        xs={6}
        container
        direction="column"
        className={classes.leftHalf}
      >
        <SpriteSide
          slides={slides}
          index={state.index}
          offsetRadius={state.offsetRadiusSprite}
          showNavigation={state.showNavigation}
          moveSlide={moveSlide}
          modBySlidesLength={modBySlidesLength}
        />
      </Grid>
      <Grid
        item
        xs={6}
        container
        direction="column"
        className={classes.rightHalf}
      >
        <ListSide
          slides={slides}
          index={state.index}
          offsetRadius={state.offsetRadiusList}
          showNavigation={state.showNavigation}
          moveSlide={moveSlide}
          modBySlidesLength={modBySlidesLength}
        />
      </Grid>
    </Grid>
  );
};

export default Dex;
