import { useContext } from "react";
import { ScriptContext } from "./ScriptContext";

const useScripts = () => {
  const { scripts, setScripts } = useContext(ScriptContext);

  const loadScript = (name: string) => {
    // TODO: implement this
  };
  const saveScript = (script: Engine.Script) => {
    // TODO: implement this
  };
  const createScript = (name: string) => {
    // TODO: implement this
  };

  return {
    scripts,
    setScripts,
    loadScript,
    saveScript,
    createScript
  };
}

export default useScripts;