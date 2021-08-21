declare namespace Engine {
  import { v4 as uuidv4 } from 'uuid';
  const OrbitControls = oc(THREE);
  import oc from 'three-orbit-controls';
  
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
    components: Record<ComponentType, ComponentProps>;
    geometry?: THREE.BufferGeometry;
    material?: THREE.Material;
  }
  // #endregion

  // #region -- Camera --
  type ControlType = "orbit" | "firstPerson" | "fixed";
  
  interface CameraProps {
    position: THREE.Vector3;
    fov: number;
    near: number;
    far: number;
    controls: ControlType
  }

  // #endregion

  // #region -- Component -- 


  type ComponentType = "transform" | string;
  type ComponentPropType = [number, number] | [number, number, number] | number | string;
  type CombinedComponentPropName = `${ComponentType}--${string}`
  type ComponentProps = Record<string, ComponentPropType>;

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