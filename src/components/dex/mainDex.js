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
    maxHeight: "100%",
    justifyContent: "center",
    alignContent: "center"
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2)
  }
}));

////gets a list of 20 pokes, number, spriteUrl, api url

const slides = [
  {
    key: 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`,
    name: "bulbasaur"
  },
  {
    key: 2,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png`,
    name: "ivysaur"
  },
  {
    key: 3,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png`,
    name: "venosaur"
  },
  {
    key: 4,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png`,
    name: "charmander"
  },
  {
    key: 5,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png`,
    name: "charmeleon"
  },
  {
    key: 6,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png`,
    name: "charizard"
  },
  {
    key: 7,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png`,
    name: "squirtle"
  },
  {
    key: 8,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png`,
    name: "wartortle"
  },
  {
    key: 9,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png`,
    name: "blastoise"
  },
  {
    key: 10,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png`,
    name: "caterpie"
  },
  {
    key: 11,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png`,
    name: "asdf"
  },
  {
    key: 12,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png`,
    name: "venosdfgsaur"
  },
  {
    key: 13,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png`,
    name: "chadfhgjrmander"
  },
  {
    key: 14,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png`,
    name: "tretruy"
  },
  {
    key: 15,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png`,
    name: "dfghfdg"
  },
  {
    key: 16,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png`,
    name: "qwewqr"
  },
  {
    key: 17,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png`,
    name: "bnmvbn"
  },
  {
    key: 18,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png`,
    name: "poiupoiu"
  }
];

const Dex = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true
  });

  return (
    <Grid container className={classes.container}>
      <Grid
        item
        xs={7}
        container
        direction="column"
        className={classes.leftHalf}
      >
        <SpriteSide
          slides={slides}
          offsetRadius={state.offsetRadius}
          showNavigation={state.showNavigation}
        />
      </Grid>
      <Grid item xs={5} container className={classes.rightHalf}>
        <ListSide slides={slides} />
      </Grid>
    </Grid>
  );
};

export default Dex;
