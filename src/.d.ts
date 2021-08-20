declare namespace Engine {
  // #region -- Script -- 
  type Language = "typescript" | "javascript" | "glsl"
  type ScriptType = "component" | "shader"
  type ScriptID = string;

  interface Script {
    id: ScriptID;
    name: string;
    content: string;
    language: Language;
    type: ScriptType;
  }

  // #endregion

  // #region -- Entity -- 
  type EntityID = string;

  interface EntityProps {
    id: EntityID;
    name: string;
    children: EntityProps[];
  }

  class Entity {
    mesh: THREE.Mesh;
  }

  // #endregion

  // #region -- Camera --
  type ControlType = "orbit" | "firstPerson" | "fixed";
  
  interface CameraProps {
    fov: number;
    near: number;
    far: number;
    controls: ControlType
  }

  // #endregion

  // #region -- Component -- 

  type ComponentType = "transform" | string;
  type ComponentProps = unknown;

  abstract class Component {
    name: string;
    _entity: Entity;

    constructor(entity: Engine.IEntity) {
      this._entity = entity;
    }

    abstract Update(): void;
  }

  // #endregion

  // #region -- Scene --
  interface SceneConfig {
    camera: CameraProps;
    entities: EntityProps[]
  }

  interface ScenePayload {
    sceneConfig: SceneConfig; // all entities & camera
    scripts: Script[] // all custom scripts
  }
  // #endregion 
}