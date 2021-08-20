import CameraManager from "./CameraManager";
import Entity from "./Entity";

export default class SceneManager {
  // TODO: Figure out which values can be made private
  public static instance: SceneManager;
  static isRunning: boolean = false;

  static _entities: Entity[] = [];
  static _components: Record<Engine.ComponentType, Engine.Component> = {};
  static cameraManager: CameraManager = new CameraManager();

  constructor() {
    if (SceneManager.instance) return;
    SceneManager.instance = this;
  }

  static CreateEntity(props: Engine.EntityProps, parent?: Entity): Entity {
    const entity = new Entity(props);
    if (parent) {
      parent.addChild(entity);
    }
    SceneManager._entities.push(entity);
    return entity;
  }

  static CreateComponent(type: Engine.ComponentType, componentProps: Engine.ComponentProps) {
    // TODO: Implement this
  }

  static Run(scenePayload: Engine.ScenePayload, renderElement: HTMLElement) {
    // TODO: Implement this
  }

  static Stop() {
    // TODO: Implement this
  }
}