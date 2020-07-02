import { useCallback, useEffect } from "react";

//function, time in ms, dependancies
const useDebounceEffect = (effect, delay, deps) => {
  const callback = useCallback(effect, deps);

  //waits to useEffect until the dependancy hasnt updated for the duration of the delay
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};

export default useDebounceEffect;
