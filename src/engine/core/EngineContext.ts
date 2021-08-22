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

  init(renderElement: HTMLElement) {
    this._renderElement = renderElement;
    this.cameraManager.setup(this._renderElement, this.sceneManager.getScene());
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
    this.sceneManager.setScenePayload(payload);
  }

  isPlaying(): boolean {
    return this.sceneManager.isPlaying ?? false
  }
}

const context = new EngineContext();

export default context;