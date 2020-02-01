import React from "react";
import { Grid, makeStyles } from "../../theme/themIndex";

const useStyles = makeStyles(theme => ({
  container: {
    background: "green"
  },
  half: {
    background: "yellow"
  }
}));

const TrainerCard = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item xs={6} className={classes.half}>
        Left
      </Grid>
      <Grid item xs={6} className={classes.half}>
        Right
      </Grid>
    </Grid>
  );
};

export default TrainerCard;
