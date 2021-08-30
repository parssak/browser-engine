import * as THREE from "three"
import { deepClone } from "../../utils"
import CameraManager from "./CameraManager"
import Entity from "./Entity"
import MaterialManager from "./MaterialManager"
import equal from "deep-equal"
export default class SceneManager {
  public static instance: SceneManager
  private isPlaying: boolean = false // If true, in play mode, else in edit mode
  private _scene!: THREE.Scene
  private _entities: Entity[] = []
  private _scenePayload: Engine.ScenePayload | undefined

  // Selection
  private _selectedEntityID: Engine.EntityID | undefined

  // Helpers
  private _axes = new THREE.AxesHelper(2)
  private _gridHelper = new THREE.GridHelper(60, 6)
  private _selectionHelper: THREE.BoxHelper | undefined

  constructor() {
    if (SceneManager.instance) {
      return
    }
    SceneManager.instance = this
    this._scene = new THREE.Scene()
    this._scene.add(this._axes)
    this._scene.add(this._gridHelper)
    this._scene.add(new THREE.DirectionalLight(0xffffff, 0.6))
    this._scene.add(new THREE.AmbientLight(0x555555))
    const loader = new THREE.TextureLoader()
    loader.load("/browser-engine/resources/skybox.png", (texture) => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
      rt.fromEquirectangularTexture(CameraManager.instance.renderer, texture)
      this._scene.background = rt.texture
    })
  }

  static isPlaying() {
    return SceneManager.instance.isPlaying
  }

  getScene(): THREE.Scene {
    return this._scene
  }

  setScenePayload(payload: Engine.ScenePayload) {
    let shouldRecompileMaterials = true
    // TODO: Optimize this so materials aren't over-compiled

    // if (equal(this._scenePayload, payload)) {
    //   console.log("payloads equal")
    // }
    // if (
    //   this._scenePayload?.sceneConfig &&
    //   equal(this._scenePayload.sceneConfig.materials, payload.sceneConfig.materials)
    // ) {
    //   // console.log("materials are equal")
    //   shouldRecompileMaterials = false
    // } else {
    //   // console.log("materials are NOT equal")
    // }
    this._scenePayload = payload
    if (shouldRecompileMaterials) {
      this._compileMaterials()
      console.debug("recompiling mats")
    }
  }

  getSelectedEntityPayload(): Engine.EntityProps | undefined {
    return this._scenePayload?.sceneConfig.entities.find(
      (e) => e.id === this._selectedEntityID
    )
  }

  updateEntityPayload(entityID: Engine.EntityID, entityProps: Engine.EntityProps) {
    const updateIndex = this._entities.findIndex((e) => e.id === entityID)
    if (updateIndex === -1) return
    this._entities[updateIndex].init(entityProps)
    this._selectionHelper?.setFromObject(this._entities[updateIndex].mesh)
  }

  updateScene(deltaTime: number, elapsedTime: number) {
    this._entities.forEach((entity) => {
      entity.update(deltaTime, elapsedTime)
    })
  }

  /** Runs scene in play mode.
   *
   *  In play mode, the components in all
   *  entities are updated each frame.
   */
  runPlayScene() {
    this.isPlaying = true
    this._resetScene()
    this._scene.remove(this._axes)
    this._scene.remove(this._gridHelper)
    // this._scene.background = new THREE.Color("rgb(0,0,0)")
    if (this._selectionHelper) this._scene.remove(this._selectionHelper)
    try {
      this._buildEntities()
      this._startEntities()
    } catch (error) {
      console.error("Error whilst setting up play scene")
    }
  }

  /** Runs scene in edit mode
   *
   *  In edit mode, the scene is reset and all
   *  entities are reverted to their initial states,
   *  based on the scenePayload.
   */
  runEditScene() {
    this.isPlaying = false
    this._resetScene()
    // this._scene.background = new THREE.Color("rgb(0,2,60)")
    this._scene.add(this._axes)
    this._scene.add(this._gridHelper)
    if (this._selectionHelper) this._scene.add(this._selectionHelper)
    this._buildEntities()
  }

  /** Select an entity by ID */
  selectByID(entityID: Engine.EntityID) {
    this.select(this._entities.find((e) => e.id === entityID)?.mesh ?? undefined)
  }

  /** Sets Entity with corresponding object as selected,
   *  if no object is passed, deselects any selected entity
   * @param object THREE.Object3D
   */
  select(object?: THREE.Object3D) {
    if (this.isPlaying) return
    if (!object && this._selectionHelper && this._selectedEntityID) {
      this._scene.remove(this._selectionHelper)
      this._selectedEntityID = undefined
      return
    }

    if (object) {
      this._selectedEntityID = object.uuid
      if (!this._selectionHelper) {
        this._selectionHelper = new THREE.BoxHelper(object, 0xffff00)
        this._scene.add(this._selectionHelper)
        return
      }

      this._selectionHelper?.setFromObject(object)
      this._scene.add(this._selectionHelper)
    }
  }

  getSelectedEntity(): Engine.EntityID | undefined {
    return this._selectedEntityID
  }

  buildEntity(props: Engine.EntityProps): Entity {
    const entity = new Entity(props)
    this._entities.push(entity)
    this._scene.add(entity.mesh)
    return entity
  }

  private _startEntities() {
    this._entities.forEach((entity) => {
      entity.start()
    })
  }

  private _resetScene() {
    this._entities.forEach((entity) => {
      this._scene.remove(entity.mesh)
      entity.destroy()
    })
    this._entities = []
  }

  private _buildEntities() {
    if (!this._scenePayload) return
    // This prevents all of the strange object mutation
    const localPayloadCopy = deepClone<Engine.ScenePayload>(this._scenePayload)
    localPayloadCopy.sceneConfig.entities.forEach((entityProps) => {
      this.buildEntity(entityProps)
    })
  }

  private _compileMaterials() {
    if (!this._scenePayload) return
    this._scenePayload.sceneConfig.materials.forEach((material) => {
      const associatedVertexShader = this._scenePayload?.scripts.find(
        (script) => script.id === material.vertexShaderID
      )

      const associatedFragmentShader = this._scenePayload?.scripts.find(
        (script) => script.id === material.fragmentShaderID
      )

      if (!associatedVertexShader || !associatedFragmentShader) return
      const materialPayload: Engine.Material = {
        material,
        vertexShader: associatedVertexShader.content,
        fragmentShader: associatedFragmentShader.content,
      }
      MaterialManager.instance.addCustomMaterial(materialPayload)
    })
  }
}
