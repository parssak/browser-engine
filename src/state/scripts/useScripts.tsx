
import { useContext, useState, } from "react";
import { generateNewScript } from "../../utils/script.utils";
import { ScriptContext } from "./ScriptContext";

const useScripts = () => {
  const { scripts, setScripts, selectedScript, setSelectedScript, compileScripts } = useContext(ScriptContext);
  const [scriptBody, setScriptBody] = useState<string>(selectedScript?.content ?? "")

  const loadScript = (scriptID: string) => {
    const script = scripts.find(s => s.id === scriptID);
    setSelectedScript(script);
  };
  
  const saveScript = (script: Engine.Script) => {
    const foundScript = scripts.find(s => s.id === script.id);
    if (!foundScript) return;
    foundScript.content = script.content;
    compileScripts();
  };
  
  const createScript = (name: string) => {
    const newScript = generateNewScript(name);
    setScripts([...scripts, newScript]);
  };


  return {
    scripts,
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