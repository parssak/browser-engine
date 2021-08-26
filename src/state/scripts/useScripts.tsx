import Component from '../../engine/core/Component';
import ComponentManager from '../../engine/core/ComponentManager';
import { useContext, useEffect, useState } from "react";
import { formatScriptString, generateNewScript } from "../../utils/script.utils";
import { ScriptContext } from "./ScriptContext";
import { BaseComponentType } from '../../engine/core/Component';

const useScripts = () => {
  const { scripts, setScripts, selectedScript, setSelectedScript, compileScripts } = useContext(ScriptContext);

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
    selectedScript,
    setSelectedScript,
    loadScript,
    saveScript,
    createScript,
  };
}

export default useScripts;