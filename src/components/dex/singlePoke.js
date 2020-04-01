import React, { useState, useEffect } from "react";
import { animated, useSpring, config } from "react-spring";
import {
  Grid,
  makeStyles,
  Typography,
  IconButton,
  ArrowDownward,
  ArrowUpward
} from "../../theme/themIndex";
import theme from "../../theme/muiTheme";

//opening the singlePoke make calls to two places:
//slides.
//url: https://pokeapi.co/api/v2/pokemon-species/123/
//nameUrl : https://pokeapi.co/api/v2/pokemon/pokemonsName/
//and stores all relevant info into global context

const SinglePoke = ({ activePoke, singlePokeOpen, toggleSinglePokeOpen }) => {
  return <>"IM OPEN"</>;
};

export default SinglePoke;
