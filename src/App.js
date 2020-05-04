import React from "react";

import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme/muiTheme";
import { Container } from "./theme/themIndex";
import Shell from "./components/shell";

// import { Route } from "react-router";

import SpringModalMenu from "./components/menu";
import { DexState } from "./context/globalContext";
import DexProvider from "./context/globalContext";
import DexReducer from "./context/dexReducer";

import Dex from "./components/dex/mainDex";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <DexProvider initialState={DexState} reducer={DexReducer}>
        <Container disableGutters maxWidth={false}>
          <SpringModalMenu />
          <Shell>
            <Dex />
            {/*Future use- backend DB and user auth
        <Route exact path="/trainercard" component={trainerCard} />
        <Route exact path="/" component={Dex} />
        <Route exact path="/teambuilder" component={teamBuilder} />
        <Route exact path="/typecalc" component={typeCalc} /> */}
          </Shell>
        </Container>
      </DexProvider>
    </MuiThemeProvider>
  );
};

export default App;
