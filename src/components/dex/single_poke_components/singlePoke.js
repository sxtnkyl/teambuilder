import React, { useEffect } from "react";

import makeSinglePoke from "../../../utility/makeSinglePoke";
import { useDexContext } from "../../../context/globalContext";
import Details from "./details";

const SinglePoke = () => {
  const [{ genList, currentDexGen, globalIndex }, dispatch] = useDexContext();

  let currentSinglePoke = genList[currentDexGen - 1].pokes[globalIndex];
  let currentPokeDataIsLoaded = currentSinglePoke.urlObj.flavor_text_entries.length !== 0 && currentSinglePoke.nameUrlObj.types.length !== 0


  useEffect(() => {
    if (!currentPokeDataIsLoaded) {
      makeSinglePoke(currentSinglePoke)
        .then((data) => {
          dispatch({
            type: "updateSinglePokeUrl",
            updatedNewPokeUrl: data.urldata,
          })
          dispatch({
            type: "updateSinglePokeName",
            updatedNewPokeName: data.namedata,
          })
        })
    }
  }, [currentSinglePoke, currentPokeDataIsLoaded, dispatch])


  return currentPokeDataIsLoaded ? (
    <Details
      currentSinglePoke={currentSinglePoke}
    />
  ) : (
      `Loading...`
    )
}
export default SinglePoke;
