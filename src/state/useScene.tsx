import { useContext, useEffect, useRef } from "react";
import { SceneContext } from "./SceneContext";

const useScene = () => {
  const { scene } = useContext(SceneContext);
  const ref = useRef<any>();

  useEffect(() => {
    scene.Initialize(ref.current);
    scene.Run();
  }, [ref, scene]);


  return { ref, scene };
}

export default useScene;