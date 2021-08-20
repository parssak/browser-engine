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

  // class Entity {
  //   public name: string = "";
  //   public mesh: THREE.Mesh;
  //   private _id = uuidv4();
  //   private children: Entity[];
  //   private components: Record<ComponentType, Component>;

  //   constructor(props: EntityProps) {
  //     const mat = props.material ?? new THREE.MeshBasicMaterial();
  //     const geometry = props.geometry ?? new THREE.BoxBufferGeometry();
  //     this.mesh = new THREE.Mesh(geometry, mat);

  //     if (props) {
  //       props.children.forEach(entityProps => {
  //         const child: Entity = SceneManager.CreateEntity(entityProps, this);
  //         this.addChild(child);
  //       });
  //     }
  //   }

  //   addChild(child: Entity) {
  //     // TODO: Implement
  //   }

  //   addComponent(type: ComponentType, componentProps: ComponentProps) {
  //     // TODO: Implement
  //   }

  //   getProps(): Record<ComponentType, ComponentProps> {
  //     // TODO: Implement
  //     return {};
  //   }

  //   update() {
  //     // TODO: Implement
  //   }
  // }

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

  // class CameraManager {
  //   public static instance: CameraManager;

  //   constructor() {
  //     if (CameraManager.instance) return;
  //     CameraManager.instance = this;
  //   }
  // }

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

  // class SceneManager {
  //   // TODO: Figure out which values can be made private
  //   public static instance: SceneManager;
  //   isRunning: boolean = false;

  //   static _entities: Entity[] = [];
  //   static _components: Record<ComponentType, Component> = {};
  //   static cameraManager: CameraManager = new CameraManager();

  //   constructor() {
  //     if (SceneManager.instance) return;
  //     SceneManager.instance = this;
  //   }

  //   static CreateEntity(props: EntityProps, parent?: Entity): Entity {
  //     const entity = new Entity(props);
  //     if (parent) {
  //       parent.addChild(entity);
  //     }
  //     SceneManager._entities.push(entity);
  //     return entity;
  //   }

  //   static CreateComponent(type: ComponentType, componentProps: ComponentProps) {
  //     const component = new Component(type, componentProps);
  //     SceneManager._components[type] = component;
  //     return component;
  //   }

  //   static Run(scenePayload: ScenePayload, renderElement: HTMLElement) {
  //     // TODO: Implement this
  //   }
    
  //   static Stop() {
  //     // TODO: Implement this
  //   }
  // }

  // #endregion 
}