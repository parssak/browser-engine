import CameraManager from "./CameraManager";
import ComponentManager from "./ComponentManager";
import SceneManager from "./SceneManager";

class EngineContext {
  sceneManager: SceneManager;
  cameraManager: CameraManager;
  componentManager: ComponentManager;
  private _renderElement!: HTMLElement;

  constructor() {
    this.sceneManager = new SceneManager();
    this.cameraManager = new CameraManager();
    this.componentManager = new ComponentManager();
  }

  init(renderElement: HTMLElement) {
    this._renderElement = renderElement;
    this.cameraManager.setup(this._renderElement, this.sceneManager.getScene());
  }

  run(scenePayload: Engine.ScenePayload) {
    this.sceneManager.runScene(scenePayload);
    this.cameraManager.setup(this._renderElement, this.sceneManager.getScene());
  }

  stop() {
    this.sceneManager.stopScene();
    this.cameraManager.setup(this._renderElement, this.sceneManager.getScene());
  }

  isRunning(): boolean {
    return this.sceneManager.isRunning ?? false
  }

}

const context = new EngineContext();

export default context;