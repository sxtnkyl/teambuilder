const DexReducer = (state, action) => {
  switch (action.type) {
    //for shell animations and changing router
    case "toggleOpen":
      return {
        ...state,
        open: !state.open
      };
    case "updateGenList":
      return {
        ...state,
        /////////////////////////WHY DOES THIS WORK????
        genList: [...state.genList]
      };
    case "updateCurrentGenDex":
      return {
        ...state,
        currenntGenDex: action.newCurrentGen
      };
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
