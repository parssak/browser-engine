import * as THREE from 'three';
import Entity from "./Entity";

export default class SceneManager {
  public static instance: SceneManager;
  public isPlaying: boolean = false; // If true, in play mode, else in edit mode
  private _scene = new THREE.Scene();
  private _entities: Entity[] = [];
  private _scenePayload: Engine.ScenePayload | undefined;

  constructor() {
    if (SceneManager.instance) { return; }
    SceneManager.instance = this;
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

  createEntity(props: Engine.EntityProps): Entity {
    const entity = new Entity(props);
    // if (parent) {
    //   parent.addChild(entity);
    // }
    this._entities.push(entity);
    this._scene.add(entity.mesh);
    return entity;
  }

  updateScene() {
    this._entities.forEach(entity => {
      entity.update();
    });
  }

  runPlayScene() {
    this.isPlaying = true;
    this.resetScene();
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
    if (!this._scenePayload) return;
    this._scenePayload.sceneConfig.entities.forEach(entityProps => {
      this.createEntity(entityProps);
    });
  }
}