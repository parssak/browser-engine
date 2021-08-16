import { useContext, useRef } from "react";
import { SceneContext } from "./SceneContext";

const useScene = () => {
  const {  } = useContext(SceneContext);
  const ref = useRef<any>();

  return { ref };
}

export default useScene;