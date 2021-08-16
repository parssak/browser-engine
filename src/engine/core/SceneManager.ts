import * as THREE from 'three';
import Entity from ".";
import CameraManager from './CameraManager';

export default class SceneManager {

  static scene: THREE.Scene = new THREE.Scene();
  static entities: Entity[] = [];
  cameraManager: CameraManager = new CameraManager();

  static CreateEntity(entityProps: IEntityProps, parent?: Entity) {
    const entity = new Entity(entityProps);
    this._AddEntityToScene(entity);
  }

  static _AddEntityToScene(entity: Entity) {
    this.entities.push(entity);
    this.scene.add(entity.mesh);
  }
}