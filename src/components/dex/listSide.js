//https://github.com/bvaughn/react-window
//https://material-ui.com/api/list-item/
//https://material-ui.com/components/lists/

import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "../../theme/themIndex";

const useStyles = makeStyles(theme => ({
  container: {
    background: "yellow",
    height: "100%",
    padding: theme.spacing(2)
  }
}));

const ListSide = () => {
  const classes = useStyles();

  return <Grid item className={classes.container}></Grid>;
};

export default ListSide;
