import axios from "axios";

const makeSinglePoke = (currentSinglePoke, dispatch) => {
  //currentSinglePoke = {
  //   name: "bulbasaur",
  //   dexNo: 1,
  //   img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`,
  //   url: `https://pokeapi.co/api/v2/pokemon/1/`,
  //   nameUrl: `https://pokeapi.co/api/v2/pokemon/bulbasaur/`,
  //   urlObj: {},
  //   nameUrlObj: {}
  // };
  //opening the singlePoke with unpopulated poke object makes calls to two places:
  //url: https://pokeapi.co/api/v2/pokemon-species/123/
  //nameUrl : https://pokeapi.co/api/v2/pokemon/pokemonsName/
  //and stores all relevant info into urlObj and nameUrlObj in global state
  console.log(currentSinglePoke);

  const { name, dexNo, img, url, nameUrl, urlObj, nameObj } = currentSinglePoke;

  const fetchNameData = async () => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${dexNo}`
      );
      const fetchedPoke = res.data;
      console.log(fetchedPoke);
      //dispatch obj into global context
      dispatch({
        type: "updateSinglePokeUrl",
        // newPokemon: (selectedGen.pokes = pokeArr)
        updatedNewPoke: fetchedPoke
      });
    } catch (e) {
      console.log("the error is", e);
    }
  };
  fetchNameData();
  // const fetchUrlData = async () => {
  //   try {
  //     const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
  //     const fetchedPokes = res.data["results"];
  //     const pokeArr = [];
  //     fetchedPokes.forEach(p => pokeArr.push(makeUrlInfo(p)));
  //     //update context- find index of gen, change pokes property
  //     dispatch({
  //       type: "updateGenList",
  //       // newPokemon: (selectedGen.pokes = pokeArr)
  //       newPokemon: pokeArr
  //     });
  //   } catch (e) {
  //     console.log("the error is", e);
  //   }
  // };
};

export default makeSinglePoke;
