const DexReducer = (state, action) => {
  switch (action.type) {
    //for shell animations and changing router
    case "toggleOpen":
      return {
        ...state,
        open: !state.open,
      };
    case "updateGenList":
      let updatedGenList = state.genList.slice();
      updatedGenList[state.currentDexGen - 1].pokes = action.newPokemon;
      return {
        ...state,
        genList: updatedGenList,
      };
    case "updateCurrentDexGen":
      return {
        ...state,
        currentDexGen: action.newGen,
      };
    case "updateGlobalIndex":
      return {
        ...state,
        globalIndex: action.newIndex,
      };
    case "updateSinglePokeUrl":
      let currentSinglePokeUrl = state.genList.slice();
      currentSinglePokeUrl[state.currentDexGen - 1].pokes[
        state.globalIndex
      ].urlObj = action.updatedNewPokeUrl;
      return {
        ...state,
        genList: currentSinglePokeUrl,
      };
    case "updateSinglePokeName":
      let currentSinglePokeName = state.genList.slice();
      currentSinglePokeName[state.currentDexGen - 1].pokes[
        state.globalIndex
      ].nameUrlObj = action.updatedNewPokeName;
      return {
        ...state,
        genList: currentSinglePokeName,
      };
    case "updateSingleMoveset":
      let currentPokeMoveset = state.genList.slice();
      currentPokeMoveset[state.currentDexGen - 1].pokes[
        state.globalIndex
      ].nameUrlObj.moves = action.updatedMoveset;
      return {
        ...state,
        genList: currentPokeMoveset,
      };
    case "updateLoading":
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default DexReducer;
