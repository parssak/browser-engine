
import { useContext, useState, } from "react";
import { generateNewScript } from "../../utils/script.utils";
import { ScriptContext } from "./ScriptContext";

const useScripts = () => {
  const { scripts, setScripts, selectedScript, setSelectedScript, compileScripts } = useContext(ScriptContext);
  const [scriptBody, setScriptBody] = useState<string>(selectedScript?.content ?? "")

  const loadScript = (scriptName: string) => {
    setSelectedScript(scripts[scriptName]);
  };
  
  const saveScript = (script: Engine.Script) => {
    const foundScript = Object.values(scripts).find((s) => s.id === script.id)
    if (!foundScript) return;
    foundScript.content = script.content;
    compileScripts();
  };
  
  const createScript = (name: string) => {
    const newScript = generateNewScript(name);
    setScripts({...scripts, [newScript.name]: newScript});
  };

  return {
    scripts: Object.values(scripts),
    setScripts,
    scriptBody,
    setScriptBody,
    selectedScript,
    setSelectedScript,
    loadScript,
    saveScript,
    createScript,
  };
}

export default useScripts;