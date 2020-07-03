import React from "react";

import BasicInfo from "./basicinfo";
import Moves from "./moves";
import Stats from "./stats";

import { Skeleton } from "../../../theme/themIndex";

import useDebounceEffect from "../../../utility/useDebounceEffect";
import makeSinglePoke from "../../../utility/makeSinglePoke";
import { useDexContext } from "../../../context/globalContext";

//Determines which component to render based on activeTab value
//makes sure context has data, if not fetches data

const SinglePoke = ({ activeTab }) => {
  const [{ genList, currentDexGen, globalIndex }, dispatch] = useDexContext();

  let currentSinglePoke = genList[currentDexGen - 1].pokes[globalIndex];
  let currentPokeDataIsLoaded =
    currentSinglePoke.urlObj.flavor_text_entries.length !== 0 &&
    currentSinglePoke.nameUrlObj.types.length !== 0;

  function gatherData() {
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
  }

  useDebounceEffect(() => gatherData(), 500, [currentSinglePoke]);

  const tab =
    activeTab === 0 ? (
      <BasicInfo />
    ) : activeTab === 1 ? (
      <Moves />
    ) : activeTab === 2 ? (
      <Stats />
    ) : (
      "<Breeding />"
    );

  return currentPokeDataIsLoaded ? (
    tab
  ) : (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "",
        overflow: "hidden",
      }}
    >
      <Skeleton
        animation="wave"
        variant="rect"
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
};
export default SinglePoke;
