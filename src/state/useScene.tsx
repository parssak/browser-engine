import { useContext, useEffect, useRef } from "react";
import { connectContainerToScene } from "../engine/core";
import { SceneContext } from "./SceneContext";

const useScene = () => {
  const { scene } = useContext(SceneContext);
  const ref = useRef<any>();

  useEffect(() => {
    scene.Initialize(ref.current);
    scene.Run();
  }, [ref]);


  return { ref, scene };
}

export default useScene;