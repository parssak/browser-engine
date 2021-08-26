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
  private isInitialized = false;

  constructor() {
    this.sceneManager = new SceneManager();
    this.cameraManager = new CameraManager();
    this.componentManager = new ComponentManager();
    this.materialManager = new MaterialManager();
    this.geometryManager = new GeometryManager();
  }

  init(renderElement: HTMLElement, payload?: Engine.ScenePayload) {
    if (this.isInitialized) return;
    this._renderElement = renderElement;
    if (payload) this.updateScenePayload(payload);
    this.runEditMode();
    this.isInitialized = true;
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

  updateSpecificEntity(entityID: Engine.EntityID, entityProps: Engine.EntityProps) {
    this.sceneManager.updateEntityPayload(entityID, entityProps);
  }

  addNewEntity(entity: Engine.EntityProps) {
    this.sceneManager.buildEntity(entity);

  }

  isPlaying(): boolean {
    return SceneManager.isPlaying() ?? false
  }

  handleClick(mouseX: number, mouseY: number) {
    this.cameraManager.handleClick(mouseX, mouseY);
  }

  selectEntity(entityID: Engine.EntityID) {
    this.sceneManager.selectByID(entityID);
  }

  getSelectedEntity(): Engine.EntityID | undefined {
    return this.sceneManager.getSelectedEntity();
  }

  getSelectedEntityProps(): Engine.EntityProps | undefined {
    return this.sceneManager.getSelectedEntityPayload();
  }
}

const context = new EngineContext();

export default context;