import * as THREE from 'three';
import Entity from "./Entity";

export default class SceneManager {
  public static instance: SceneManager;
  private isPlaying: boolean = false; // If true, in play mode, else in edit mode
  private _scene = new THREE.Scene();
  private _entities: Entity[] = [];
  private _scenePayload: Engine.ScenePayload | undefined;
  private _axes = new THREE.AxesHelper(2);

  constructor() {
    if (SceneManager.instance) { return; }
    SceneManager.instance = this;
    this._scene.add(this._axes);
  }

  static isPlaying() {
    return SceneManager.instance.isPlaying;
  }

  getScene(): THREE.Scene {
    return this._scene;
  }

  setScenePayload(payload: Engine.ScenePayload) {
    this._scenePayload = payload;
  }

  updateEntityPayload(entityID: Engine.EntityID, entityProps: Engine.EntityProps) {
    const updateIndex = this._entities.findIndex(e => e.id === entityID);
    if (updateIndex === -1) return;
    this._entities[updateIndex].initComponents(entityProps.components);
  }

  updateScene() {
    this._entities.forEach(entity => {
      entity.update();
    });
  }

  runPlayScene() {
    this.isPlaying = true;
    this.resetScene();
    this._scene.remove(this._axes);
    this.buildEntities();
  }
  
  runEditScene() {
    this.isPlaying = false;
    this.resetScene();
    this._scene.add(this._axes);

    this.buildEntities();
  }

  select(object: THREE.Object3D) {
    console.log('selected', object);
  }

  private resetScene() {
    this._entities.forEach(entity => {
      entity.destroy();
      this._scene.remove(entity.mesh);
    });
    this._entities = [];
  }

  private buildEntities() {
    if (!this._scenePayload) return;
    this._scenePayload.sceneConfig.entities.forEach(entityProps => {
      this.buildEntity(entityProps);
    });
  }

  buildEntity(props: Engine.EntityProps): Entity {
    const entity = new Entity(props);
    this._entities.push(entity);
    this._scene.add(entity.mesh);
    return entity;
  }
}