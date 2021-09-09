import * as THREE from "three"
import ScriptCompiler from "../../utils/ScriptCompiler"
import CameraManager from "./CameraManager"
import ComponentManager from "./ComponentManager"
import ControlsManager from "./ControlsManager"
import GeometryManager from "./GeometryManager"
import MaterialManager from "./MaterialManager"
import SceneManager from "./SceneManager"

class EngineContext {
  sceneManager: SceneManager
  cameraManager: CameraManager
  componentManager: ComponentManager
  materialManager: MaterialManager
  geometryManager: GeometryManager
  controlsManager: ControlsManager
  time = new THREE.Clock()
  private _renderElement!: HTMLElement
  private isInitialized = false

  constructor() {
    this.sceneManager = new SceneManager()
    this.cameraManager = new CameraManager()
    this.componentManager = new ComponentManager()
    this.materialManager = new MaterialManager()
    this.geometryManager = new GeometryManager()
    this.controlsManager = new ControlsManager()
  }

  init(renderElement: HTMLElement, payload?: Engine.ScenePayload) {
    if (this.isInitialized) return
    this._renderElement = renderElement
    if (payload) this.updateScenePayload(payload, true)
    this.runEditMode()
    this.isInitialized = true
  }

  runPlayMode() {
    this.time.elapsedTime = 0
    this.time.start()
    this.sceneManager.runPlayScene()
    const sceneCam = this.sceneManager.getScene().getObjectByName("Main Camera")
    this.cameraManager.useSceneCamera(sceneCam as THREE.PerspectiveCamera)
    this.cameraManager.setup(this._renderElement, this.sceneManager.getScene())
  }

  runEditMode() {
    this.time.stop()
    this.sceneManager.runEditScene()
    this.cameraManager.useEditCamera()
    this.cameraManager.setup(this._renderElement, this.sceneManager.getScene())
  }

  updateScenePayload(payload: Engine.ScenePayload, forInitialization = false) {
    this.sceneManager.setScenePayload(payload, forInitialization)
  }

  updateSceneMaterials(materials: Engine.MaterialProps[]) {
    this.sceneManager.setSceneMaterials(materials)
  }

  updateSpecificEntity(entityID: Engine.EntityID, entityProps: Engine.EntityProps) {
    this.sceneManager.updateEntityPayload(entityID, entityProps)
  }

  addNewEntity(entity: Engine.EntityProps) {
    this.sceneManager.buildEntity(entity)
  }

  removeEntity(entityID: Engine.EntityID) {
    this.sceneManager.destroyEntity(entityID)
  }

  isPlaying(): boolean {
    return SceneManager.isPlaying() ?? false
  }

  handleClick(mouseX: number, mouseY: number) {
    this.cameraManager.handleClick(mouseX, mouseY)
  }

  selectEntity(entityID: Engine.EntityID) {
    this.sceneManager.selectByID(entityID)
  }

  deselectEntity() {
    this.sceneManager.deselect()
  }

  getSelectedEntity(): Engine.EntityID | undefined {
    return this.sceneManager.getSelectedEntity()
  }

  getSelectedEntityProps(): Engine.EntityProps | undefined {
    return this.sceneManager.getSelectedEntityPayload()
  }

  renameComponent(newComponentName: string, oldComponentName: string) {
    this.componentManager.renameComponent(newComponentName, oldComponentName)
    this.sceneManager.renameComponentInEntities(newComponentName, oldComponentName)
  }

  compileScripts(scripts: Engine.Script[]) {
    ScriptCompiler.CompileScripts(Object.values(scripts))
  }
}

const context = new EngineContext()

export default context
