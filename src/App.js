import React, { useState } from "react";

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme/muiTheme";
import { Container } from "./theme/themIndex";
import Shell from "./components/dexWrapper/shell";

import { Route } from "react-router";

import SpringModalMenu from "./components/menu";
import { DexState } from "./context/globalContext";
import DexProvider from "./context/globalContext";
import DexReducer from "./context/dexReducer";

const App = () => {
  console.log(DexState);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <DexProvider initialState={DexState} reducer={DexReducer}>
        <Container disableGutters maxWidth={false}>
          {/* <Overlay />
        <Header />
        <Footer />
        <Route exact path="/trainercard" component={trainerCard} />
        <Route exact path="/" component={Dex} />
        <Route exact path="/teambuilder" component={teamBuilder} />
        <Route exact path="/typecalc" component={typeCalc} /> */}
          <Shell />
          <SpringModalMenu />
        </Container>
      </DexProvider>
    </MuiThemeProvider>
  );
};

export default App;
