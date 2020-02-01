import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Button,
  Modal,
  Backdrop,
  Paper,
  Typography,
  ButtonGroup
} from "../theme/themIndex";
import { useSpring, animated } from "react-spring";
import { useDexContext } from "../context/globalContext";

const useStyles = makeStyles(theme => ({
  modal: {
    zIndex: "110",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  buttons: {
    border: `1px solid ${theme.palette.secondary.light}`,
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  },
  open: {
    position: "absolute",
    top: "0",
    left: "0"
  }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.object,
  in: PropTypes.bool.isRequired
};

export default function SpringModalMenu() {
  const classes = useStyles();
  const [{ open }, dispatch] = useDexContext();

  return (
    <>
      <Modal
        aria-labelledby="menu"
        aria-describedby="spring-modal-menu"
        className={classes.modal}
        open={!open}
        onClose={() => dispatch({ type: "toggleOpen" })}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={!open}>
          <Paper elevation={16}>
            <ButtonGroup orientation="vertical">
              <Button className={classes.buttons} fullWidth variant="text">
                <Typography variant="h2">Poke'Dex</Typography>
              </Button>
              <Button className={classes.buttons} fullWidth variant="text">
                <Typography variant="h2">Team Builder</Typography>
              </Button>
              <Button className={classes.buttons} fullWidth variant="text">
                <Typography variant="h2">Type Calculator</Typography>
              </Button>
              <Button className={classes.buttons} fullWidth variant="text">
                <Typography variant="h2">Trainer Card</Typography>
              </Button>
            </ButtonGroup>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
}
