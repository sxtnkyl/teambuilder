//https://github.com/bvaughn/react-window
//https://material-ui.com/api/list-item/
//https://material-ui.com/components/lists/
//lazy loading adds to held list

import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  List,
  ListItem,
  ListItemText
} from "../../theme/themIndex";

const useStyles = makeStyles(theme => ({
  list: {
    maxHeight: "80%",
    width: "80%",
    overflow: "auto",
    background: "",
    padding: theme.spacing(2)
  }
}));

const ListSide = props => {
  const classes = useStyles();
  const { slides } = props;

  return (
    <List className={classes.list}>
      {slides.map(slide => (
        <ListItem>
          <ListItemText>{slide.key}</ListItemText>
          <ListItemText>{slide.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default ListSide;
