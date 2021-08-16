import * as THREE from 'three';
import Entity from ".";
import CameraManager from './CameraManager';

export default class SceneManager {

  static scene: THREE.Scene = new THREE.Scene();
  static entities: Entity[] = [];
  static cameraManager: CameraManager = new CameraManager();

  static ResetScene() {
    this.scene = new THREE.Scene();
    this.entities = [];
  }

  static Run(sceneConfig: ISceneConfig) {
    // Reset the scene
    this.ResetScene();

    // TODO v2: Compile all scripts
    // TODO v2: Create custom component classes from scripts

    // Add all entities to scene
    sceneConfig.entities.forEach(entityProps => this.CreateEntity(entityProps));

    // Initialize camera
    this.cameraManager.Start();

  }

  static CreateEntity(entityProps: IEntityProps, parent?: Entity) {
    const entity = new Entity(entityProps);
    this._AddEntityToScene(entity);
  }

  static _AddEntityToScene(entity: Entity) {
    this.entities.push(entity);
    this.scene.add(entity.mesh);
  }
}