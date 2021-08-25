import * as THREE from 'three';
import CameraManager from './CameraManager';
import Entity from "./Entity";

export default class SceneManager {
  public static instance: SceneManager;
  private isPlaying: boolean = false; // If true, in play mode, else in edit mode
  private _scene = new THREE.Scene();
  private _entities: Entity[] = [];
  private _scenePayload: Engine.ScenePayload | undefined;
  private _axes = new THREE.AxesHelper(2);
  private _gridHelper = new THREE.GridHelper(60, 6);
  private _selectionHelper: THREE.BoxHelper | undefined;
  private _selectedEntityID: Engine.EntityID | undefined;

  constructor() {
    if (SceneManager.instance) { return; }
    SceneManager.instance = this;
    this._scene.add(this._axes);
    this._scene.add(this._gridHelper);
    this._scene.add(new THREE.DirectionalLight(0xffffff, 0.6));
    this._scene.add(new THREE.AmbientLight(0x555555));
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
    console.debug('updating entity payload', entityProps);
    const updateIndex = this._entities.findIndex(e => e.id === entityID);
    if (updateIndex === -1) return;
    this._entities[updateIndex].initMesh(entityProps);
    this._entities[updateIndex].initComponents(entityProps.components);
    this._selectionHelper?.setFromObject(this._entities[updateIndex].mesh);
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
    this._scene.remove(this._gridHelper);
    if (this._selectionHelper) this._scene.remove(this._selectionHelper);
    this.buildEntities();
  }

  runEditScene() {
    this.isPlaying = false;
    this.resetScene();
    this._scene.add(this._axes);
    this._scene.add(this._gridHelper);
    if (this._selectionHelper) this._scene.add(this._selectionHelper);
    this.buildEntities();
  }

  selectByID(entityID: Engine.EntityID) {
    this.select(this._entities.find(e => e.id === entityID)?.mesh);
  }

  select(object?: THREE.Object3D) {
    if (this.isPlaying) return;
    if (!object && this._selectionHelper && this._selectedEntityID) {
      console.debug('deselecting');
      this._scene.remove(this._selectionHelper);
      this._selectedEntityID = undefined;
      return;
    }
    
    if (object) {
      this._selectedEntityID = object.uuid;
      if (!this._selectionHelper) {
        this._selectionHelper = new THREE.BoxHelper(object, 0xffff00);
        this._scene.add(this._selectionHelper);
        return;
      }
      
      this._selectionHelper?.setFromObject(object);
      this._scene.add(this._selectionHelper);
    }
  }

  getSelectedEntity(): Engine.EntityID | undefined {
    return this._selectedEntityID;
  }

  private resetScene() {
    this._entities.forEach(entity => {
      this._scene.remove(entity.mesh);
      entity.destroy();
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