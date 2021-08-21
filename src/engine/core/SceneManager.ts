import * as THREE from 'three';
import CameraManager from "./CameraManager";
import Entity from "./Entity";

export default class SceneManager {
  public static instance: SceneManager;
  public static isRunning: boolean = false;
  
  private static _scene = new THREE.Scene();
  private static _components: Record<Engine.ComponentType, Engine.Component> = {};
  private static cameraManager: CameraManager = CameraManager.instance;
  private static _entities: Entity[] = [];
  private static _renderElement: HTMLElement;

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
    this._renderElement = renderElement;
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

  static Run(scenePayload: Engine.ScenePayload) {
    // TODO: Implement this thoroughly
    SceneManager.isRunning = true;
    this.ResetScene();
    scenePayload.sceneConfig.entities.forEach(entityProps => {
      SceneManager.CreateEntity(entityProps);
    });
    this.cameraManager.setup(this._renderElement, this._scene);
  }

  static Stop() {
    SceneManager.isRunning = false;
    this.ResetScene();
    this.cameraManager.setup(this._renderElement, this._scene);
  }

  private static ResetScene() {
    this._scene = new THREE.Scene();
    this._entities = [];
    this._components = {};
    this.cameraManager.resetCamera();
  }
}