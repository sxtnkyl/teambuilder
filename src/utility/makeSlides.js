//fetches pokes for slides
import axios from "axios";
//input: gen number. context genList
//data: make dexNo, name, url, img for each poke- array of objects
//output: update context with an array of objects

const makeSlides = (genNum, genList, dispatch) => {
  const selectedGen = genList[genNum - 1];

  const makeInfo = poke => {
    //returns object with name no url img
    //url = https://pokeapi.co/api/v2/pokemon-species/123/
    const { name, url } = poke;
    const obj = {
      name: "",
      dexNo: 0,
      img: "",
      url: url,
      nameUrl: ""
    };

    const dexname = name
      .toLowerCase()
      .split(" ")
      .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
      .join(" ");
    const dexno = parseInt(url.split("/")[url.split("/").length - 2]);
    const pokeimg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexno}.png`;
    const nameUrl = `https://pokeapi.co/api/v2/pokemon/${dexname}/`;

    obj.name = dexname;
    obj.dexNo = dexno;
    obj.img = pokeimg;
    obj.nameUrl = nameUrl;
    return obj;
  };

  const fetchPokes = async () => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species?offset=${selectedGen.offset}&limit=${selectedGen.limit}`
      );
      const fetchedPokes = res.data["results"];
      const pokeArr = [];
      fetchedPokes.forEach(p => pokeArr.push(makeInfo(p)));
      //update context- find index of gen, change pokes property
      dispatch({
        type: "updateGenList",
        // newPokemon: (selectedGen.pokes = pokeArr)
        newPokemon: pokeArr
      });
    } catch (e) {
      console.log("the error is", e);
    }
  };

  //gen does not have pokes yet
  if (selectedGen.pokes.length === 0) {
    //fetch the pokes and make their data
    fetchPokes();
  }
};

export default makeSlides;
