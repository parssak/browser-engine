import * as THREE from 'three';
import Entity from ".";
import CameraManager from './CameraManager';
import * as ENGINE from '../../types';

export default class SceneManager {
  static isRunning: boolean = false;
  static instance: SceneManager;
  static scene: THREE.Scene = new THREE.Scene();
  static entities: Entity[] = [];
  static cameraManager: CameraManager = new CameraManager();
  
  constructor() {
    SceneManager.instance = this;
  }

  static ResetScene() {
    this.scene = new THREE.Scene();
    this.entities = [];
  }

  static Run(sceneConfig: ENGINE.ISceneConfig, renderElement: HTMLElement) {
    this.ResetScene();

    // TODO v2: Compile all scripts
    // TODO v2: Create custom component classes from scripts

    // Add all entities to scene
    sceneConfig.entities.forEach(entityProps => this.CreateEntity(entityProps));

    // Initialize camera
    this.cameraManager.SetRenderElement(renderElement);
    this.cameraManager.Start();
  }

  static CreateEntity(entityProps: ENGINE.IEntityProps, parent?: Entity) {
    const entity = new Entity(entityProps);
    this._AddEntityToScene(entity);
    return entity;
  }

  static _AddEntityToScene(entity: Entity) {
    this.entities.push(entity);
    this.scene.add(entity.mesh);
  }

  /**
   * Runs once per frame, call's Update for each entity
   * @param {float} time Time since the Scene began
   */
  static Update() {
    if (this.isRunning)
      this.entities.forEach(entity => entity.Update());
    this.cameraManager.Update();
  }
}