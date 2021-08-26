import Component from '../../engine/core/Component';
import ComponentManager from '../../engine/core/ComponentManager';
import { useContext, useState } from "react";
import { generateNewScript } from "../../utils/script.utils";
import { ScriptContext } from "./ScriptContext";
import { BaseComponentType } from '../../engine/core/Component';

const useScripts = () => {
  const { scripts, setScripts, selectedScript, setSelectedScript } = useContext(ScriptContext);

  const loadScript = (scriptID: string) => {
    const script = scripts.find(s => s.id === scriptID);
    setSelectedScript(script);
  };
  
  const saveScript = (script: Engine.Script) => {
    // TODO: implement this
  };
  
  const createScript = (name: string) => {
    const newScript = generateNewScript(name);
    setScripts([...scripts, newScript]);
  };

  const demoCompile = () => {
    const COMPONENT_DEF = `// @defineComponent`;
    const script = `
      class Rotator {
        ${COMPONENT_DEF}

        init(props) {
          this.speed = props?.speed ?? 0.05;
          this.transform = this.entity.components['transform'];
        }

        update() {
          this.transform.rotation.x += this.speed;
          this.transform.rotation.y += this.speed;
        }
      }
    `;
    try {
      const formattedScript = script.replace(COMPONENT_DEF, `
        entity;
      
        constructor(entity) {
          this.entity = entity;
        }
      `);
      const NewComponent: any = eval(`(${formattedScript})`);
      Object.setPrototypeOf(NewComponent, Component);
      console.log(Object.getPrototypeOf(NewComponent));
      ComponentManager.instance.registerComponent(NewComponent);
    } catch (err) {
      alert(err?.message);
    }
  }

  return {
    scripts,
    setScripts,
    selectedScript,
    setSelectedScript,
    loadScript,
    saveScript,
    createScript,
    demoCompile
  };
}

export default useScripts;