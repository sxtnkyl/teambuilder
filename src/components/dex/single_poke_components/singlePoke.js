import React, { useEffect } from "react";

import Details from "./details";
import Moves from "./moves";
import Stats from "./stats";
import Breeding from "./breeding";

import makeSinglePoke from "../../../utility/makeSinglePoke";
import { useDexContext } from "../../../context/globalContext";

const SinglePoke = ({ activeTab }) => {
  const [{ genList, currentDexGen, globalIndex }, dispatch] = useDexContext();

  let currentSinglePoke = genList[currentDexGen - 1].pokes[globalIndex];
  let currentPokeDataIsLoaded =
    currentSinglePoke.urlObj.flavor_text_entries.length !== 0 &&
    currentSinglePoke.nameUrlObj.types.length !== 0;

  useEffect(() => {
    if (!currentPokeDataIsLoaded) {
      makeSinglePoke(currentSinglePoke).then((data) => {
        dispatch({
          type: "updateSinglePokeUrl",
          updatedNewPokeUrl: data.urldata,
        });
        dispatch({
          type: "updateSinglePokeName",
          updatedNewPokeName: data.namedata,
        });
      });
    }
  }, [currentSinglePoke, currentPokeDataIsLoaded, dispatch]);

  const tab =
    activeTab === 0 ? (
      <Details />
    ) : activeTab === 1 ? (
      <Moves />
    ) : activeTab === 2 ? (
      <Stats />
    ) : (
      <Breeding />
    );

  return currentPokeDataIsLoaded ? tab : `Loading...`;
};
export default SinglePoke;
