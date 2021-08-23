import CameraManager from "./CameraManager";
import ComponentManager from "./ComponentManager";
import GeometryManager from "./GeometryManager";
import MaterialManager from "./MaterialManager";
import SceneManager from "./SceneManager";

class EngineContext {
  sceneManager: SceneManager;
  cameraManager: CameraManager;
  componentManager: ComponentManager;
  materialManager: MaterialManager;
  geometryManager: GeometryManager;
  private _renderElement!: HTMLElement;

  constructor() {
    this.sceneManager = new SceneManager();
    this.cameraManager = new CameraManager();
    this.componentManager = new ComponentManager();
    this.materialManager = new MaterialManager();
    this.geometryManager = new GeometryManager();
  }

  init(renderElement: HTMLElement, payload?: Engine.ScenePayload) {
    this._renderElement = renderElement;
    if (payload) this.updateScenePayload(payload);
    this.runEditMode();
  }

  runPlayMode() {
    this.sceneManager.runPlayScene();
    this.cameraManager.setup(this._renderElement, this.sceneManager.getScene());
  }

  runEditMode() {
    this.sceneManager.runEditScene();
    this.cameraManager.setup(this._renderElement, this.sceneManager.getScene());
  }

  updateScenePayload(payload: Engine.ScenePayload) {
    console.debug('scene payload');
    this.sceneManager.setScenePayload(payload);
  }

  updateSpecificEntity(entityID: Engine.EntityID, entityProps: Engine.EntityProps) {
    this.sceneManager.updateEntityPayload(entityID, entityProps);
  }

  addNewEntity(entity: Engine.EntityProps) {
    // todo
    console.debug('(Engine): Added New Entity');
    this.sceneManager.buildEntity(entity);

  }

  isPlaying(): boolean {
    return SceneManager.isPlaying() ?? false
  }
}

const context = new EngineContext();

export default context;