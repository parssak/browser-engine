import * as THREE from 'three';
import Entity from "./Entity";

export default class SceneManager {
  public static instance: SceneManager;
  public isPlaying: boolean = false; // If true, in play mode, else in edit mode
  private _scene = new THREE.Scene();
  private _entities: Entity[] = [];
  private _sceneConfig: Engine.SceneConfig | undefined;

  constructor() {
    if (SceneManager.instance) { return; }
    SceneManager.instance = this;
  }

  getScene(): THREE.Scene {
    return this._scene;
  }

  createEntity(props: Engine.EntityProps, parent?: Entity): Entity {
    const entity = new Entity(props);
    if (parent) {
      parent.addChild(entity);
    }
    this._entities.push(entity);
    this._scene.add(entity.mesh);
    return entity;
  }

  updateScene() {
    this._entities.forEach(entity => {
      entity.update();
    });
  }

  runPlayScene(scenePayload: Engine.ScenePayload) {
    this.isPlaying = true;
    this.resetScene();
    this._sceneConfig = scenePayload.sceneConfig;
    this.buildEntities();
  }
  
  runEditScene() {
    this.isPlaying = false;
    this.resetScene();
    this.buildEntities();
  }

  private resetScene() {
    this._scene = new THREE.Scene();
    this._entities.forEach(entity => {
      entity.destroy();
    });
    this._entities = [];
  }

  private buildEntities() {
    if (!this._sceneConfig) return;
    this._sceneConfig.entities.forEach(entityProps => {
      this.createEntity(entityProps);
    });
  }
}