import * as THREE from 'three';
import CameraManager from "./CameraManager";
import Entity from "./Entity";

export default class SceneManager {
  // TODO: Figure out which values can be made private
  public static instance: SceneManager;
  static isRunning: boolean = false;
  
  static _scene = new THREE.Scene();
  private static _entities: Entity[] = [];
  static _components: Record<Engine.ComponentType, Engine.Component> = {};
  static cameraManager: CameraManager = CameraManager.instance;

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
    this._scene.add(entity.mesh);
    return entity;
  }

  static Initialize(renderElement: HTMLElement) {
    if (!this.cameraManager) {
      this.cameraManager = new CameraManager();
    }
    this.cameraManager.setup(renderElement, this._scene);
  }

  static UpdateScene() {
    SceneManager._entities.forEach(entity => {
      entity.Update();
    });
  }

  static CreateComponent(type: Engine.ComponentType, componentProps: Engine.ComponentProps) {
    // TODO: Implement this
  }

  static Run(scenePayload: Engine.ScenePayload, renderElement: HTMLElement) {
    // TODO: Implement this thoroughly
    console.debug('called SceneManager.Run()', scenePayload, renderElement);
    scenePayload.sceneConfig.entities.forEach(entityProps => {
      SceneManager.CreateEntity(entityProps);
    });
  }

  static Stop() {
    // TODO: Implement this
  }
}