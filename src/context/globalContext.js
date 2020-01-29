import React, { useContext, createContext, useReducer } from "react";

export const DexState = {
  open: true,
  page: 0,
  filters: "",
  pokemon: [],
  loading: false
};

const DexContext = createContext();

const DexProvider = ({ reducer, initialState, children }) => (
  <DexContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DexContext.Provider>
);

export const useDexContext = () => useContext(DexContext);
export default DexProvider;
