const DexReducer = (state, action) => {
  switch (action.type) {
    case "toggleOpen":
      return {
        ...state,
        open: !state.open
      };
    case "updatePage":
      return {
        ...state,
        page: action.newPage
      };
    case "updateTypes":
      return {
        ...state,
        filters: { ...state.filters, types: action.newTypes }
      };
    case "updateStats":
      return {
        ...state,
        filters: { ...state.filters, stats: action.newStats }
      };
    case "updateGen":
      return {
        ...state,
        filters: { ...state.filters, gen: action.newGen }
      };
    case "updateAlpha":
      return {
        ...state,
        filters: { ...state.filters, alpha: action.newAlpha }
      };
    case "updatePokemon":
      return {
        ...state,
        pokemon: action.newPokemon
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
