const DexReducer = (state, action) => {
  switch (action.type) {
    //for shell animations and changing router
    case "toggleOpen":
      return {
        ...state,
        open: !state.open
      };
    case "updateGenList":
      let updatedGenList = state.genList.slice();
      updatedGenList[state.currentDexGen - 1].pokes = action.newPokemon;
      return {
        ...state,
        genList: updatedGenList
      };
    case "updateCurrentDexGen":
      return {
        ...state,
        currentDexGen: action.newGen
      };
    case "updateLoading":
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default DexReducer;

// case "updatePage":
//   return {
//     ...state,
//     page: action.newPage
//   };

//for filter options
// case "updateTypes":
//   return {
//     ...state,
//     filters: { ...state.filters, types: action.newTypes }
//   };
// case "updateStats":
//   return {
//     ...state,
//     filters: { ...state.filters, stats: action.newStats }
//   };
// case "updateGen":
//   return {
//     ...state,
//     filters: { ...state.filters, gen: action.newGen }
//   };
// case "updateAlpha":
//   return {
//     ...state,
//     filters: { ...state.filters, alpha: action.newAlpha }
//   };
// case "updatePokemon":
//   return {
//     ...state,
//     pokemon: action.newPokemon
//   };
