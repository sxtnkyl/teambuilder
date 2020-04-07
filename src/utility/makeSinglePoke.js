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

  const { name, dexNo } = currentSinglePoke;

  const fetchUrlData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${dexNo}`)
        .then((res) => {
          resolve(res.data);
        })

        .catch((e) => {
          console.error(e);
          reject(e);
        });
    });
  };

  const fetchNameData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        .then((res) => {
          resolve(res.data);
        })
        //dispatch obj into global context
        .catch((e) => {
          console.error(e);
          reject(e);
        });
    });
  };

  return Promise.all([fetchUrlData(), fetchNameData()]).then(
    ([urldata, namedata]) => {
      return { urldata, namedata };
    }
  );
};

export default makeSinglePoke;
