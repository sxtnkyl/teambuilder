import React, { useState, useEffect, useRef } from "react";
import { Spring } from "react-spring/renderprops";
import {
  Grid,
  Tabs,
  Tab,
  makeStyles,
  Typography,
  IconButton,
  ArrowDownward,
  ArrowUpward,
} from "../../theme/themIndex";
import theme from "../../theme/muiTheme";
import SinglePoke from "./single_poke_components/singlePoke";

const useStyles = makeStyles((theme) => ({
  topNav: {
    zIndex: "2",
    boxShadow: `0px 4px 4px ${theme.palette.primary.dark}`,
    minHeight: "8%",
  },
  top: {
    background: `linear-gradient(135deg, white 20%, transparent 20%)`,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  tabs: {
    marginLeft: "auto",
  },
}));

const TopNav = ({
  activePoke,
  singlePokeOpen,
  toggleSinglePokeOpen,
  tabs,
  handleTabs,
}) => {
  const classes = useStyles();

  const headers = ["Details", "Moves", "Stats", "Breeding"];
  const headerTabs = (
    <Tabs value={tabs} onChange={handleTabs} className={classes.tabs}>
      {headers.map((header, index) => (
        <Tab key={index} label={`${header}`} />
      ))}
    </Tabs>
  );

  const closedTopNav = (
    <Grid
      item
      container
      justify="space-between"
      alignItems="center"
      className={classes.top}
    >
      <Typography variant="h5">{activePoke.name}</Typography>
      {singlePokeOpen && headerTabs}
      <IconButton onClick={toggleSinglePokeOpen}>
        {singlePokeOpen ? <ArrowUpward /> : <ArrowDownward />}
      </IconButton>
    </Grid>
  );

  return (
    <Spring
      to={{
        paddingTop: !singlePokeOpen ? "0px" : `${theme.spacing(2)}`,
        background: singlePokeOpen
          ? `linear-gradient(${theme.palette.secondary.light}, ${theme.palette.secondary.light})`
          : `linear-gradient(${theme.palette.secondary.main}, ${theme.palette.secondary.main})`,
      }}
    >
      {(style) => (
        <Grid
          style={style}
          item
          container
          direction="row"
          alignItems="center"
          className={classes.topNav}
        >
          {closedTopNav}
        </Grid>
      )}
    </Spring>
  );
};

export default TopNav;
