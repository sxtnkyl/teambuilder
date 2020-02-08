import React, { useContext, createContext, useReducer } from "react";

//fetch gen list on dex selection, array of objects with name and url, run through makeSlides()
//this way fetching saves pokes, and does not need to make another call
const gens = [
  {
    gen: 1,
    limit: 151,
    offset: 0,
    pokes: []
  },
  {
    gen: 2,
    limit: 100,
    offset: 151,
    pokes: []
  },
  {
    gen: 3,
    limit: 135,
    offset: 251,
    pokes: []
  },
  {
    gen: 4,
    limit: 108,
    offset: 386,
    pokes: []
  },
  {
    gen: 5,
    limit: 155,
    offset: 494,
    pokes: []
  },
  {
    gen: 6,
    limit: 72,
    offset: 649,
    pokes: []
  },
  {
    gen: 7,
    limit: 86,
    offset: 721,
    pokes: []
  }
];

export const DexState = {
  open: true,
  filters: "",
  pokemon: [],
  //store pokes list(name,url,number,img)
  genList: gens,
  //currently selected gen to display in dex component
  currentDexGen: 1,
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
