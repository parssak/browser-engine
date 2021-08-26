import Component from '../../engine/core/Component';
import ComponentManager from '../../engine/core/ComponentManager';
import { useContext } from "react";
import { generateNewScript } from "../../utils/script.utils";
import { ScriptContext } from "./ScriptContext";
import { BaseComponentType } from '../../engine/core/Component';

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
    const newScript = generateNewScript(name);
    setScripts([...scripts, newScript]);
  };

  const demoCompile = () => {
    const script = `
      class Rotator {
        _entity;

        constructor(entity) {
          this._entity = entity;
        };

        init(props) {
          this.speed = props?.speed ?? 0.05;
          this.transform = this._entity.components['transform'];
        }

        update() {
          this.transform.rotation.x += this.speed;
          this.transform.rotation.y += this.speed;
        }
      }
    `;
    try {
      const NewComponent: any = eval(`(${script})`);
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
    loadScript,
    saveScript,
    createScript,
    demoCompile
  };
}

export default useScripts;