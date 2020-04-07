import React, { useState, useEffect, useRef } from "react";
import { animated, useSpring, config } from "react-spring";
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
    boxShadow: `-4px 0px 6px ${theme.palette.primary.dark}`,
  },
  top: {
    background: `linear-gradient(135deg, white 20%, transparent 20%)`,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(1),
    alignSelf: "flex-start",
  },
}));

const TopNav = ({ activePoke, singlePokeOpen, toggleSinglePokeOpen }) => {
  const classes = useStyles();

  const [tabs, setTabs] = useState(0);
  const handleTabs = (e, newtab) => {
    setTabs(newtab);
  };
  const headers = ["Details", "Moves", "Stats", "Breeding"];
  const headerTabs = (
    <Tabs value={tabs} onChange={handleTabs}>
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
        height: !singlePokeOpen ? "7%" : "92%",
        paddingTop: !singlePokeOpen ? "0px" : "10px",
        background: singlePokeOpen
          ? `linear-gradient(${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`
          : `linear-gradient(${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
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
          {singlePokeOpen && <SinglePoke singlePokeOpen={singlePokeOpen} />}
        </Grid>
      )}
    </Spring>
  );
};

export default TopNav;
