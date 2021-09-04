import * as THREE from "three"
import { deepClone } from "../../utils"
import CameraManager from "./CameraManager"
import Entity from "./Entity"
import MaterialManager from "./MaterialManager"
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
  private _selectionHelper!: THREE.BoxHelper
  private _lightHelpers: THREE.PointLightHelper[] = []

  constructor() {
    if (SceneManager.instance) {
      return SceneManager.instance
    }
    SceneManager.instance = this
    this._scene = new THREE.Scene()
    this._scene.add(this._axes)
    this._scene.add(this._gridHelper)
    this._scene.add(new THREE.DirectionalLight("rgb(100,100,100)", 0.6))
    this._scene.add(new THREE.AmbientLight("rgb(222,221,220)", 0.6))
    this._selectionHelper = new THREE.BoxHelper(this._gridHelper, 0xffff00)
    this._selectionHelper.visible = false
    this._scene.add(this._selectionHelper)
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
    this._scenePayload = payload
    if (shouldRecompileMaterials) {
      this._compileMaterials()
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
    const object = this._entities[updateIndex].getObject()
    if (object) {
      if (object.type === "Mesh") {
        this._selectionHelper?.setFromObject(object)
      } else {
        this._lightHelpers.forEach((helper) => {
          helper.update()
        })
      }
    }
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
    this._hideHelpers()
    try {
      this._buildScene()
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
    this._showHelpers()
    this._buildScene()
  }

  /** Select an entity by ID */
  selectByID(entityID: Engine.EntityID) {
    this.select(this._entities.find((e) => e.id === entityID)?.getObject() ?? undefined)
  }

  /** Sets Entity with corresponding object as selected,
   *  if no object is passed, deselects any selected entity
   * @param object THREE.Object3D
   */
  select(object?: THREE.Object3D) {
    if (this.isPlaying) return
    if (!object && this._selectionHelper?.visible && this._selectedEntityID) {
      this._selectionHelper.visible = false
      this._selectedEntityID = undefined
      return
    }

    if (object) {
      this._selectedEntityID = object.uuid
      // if (!this._selectionHelper) {
      //   this._selectionHelper = new THREE.BoxHelper(object, 0xffff00)
      //   // this._scene.add(this._selectionHelper)
      //   return
      // }

      this._selectionHelper.setFromObject(object)
      // this._scene.add(this._selectionHelper)
    }
  }

  getSelectedEntity(): Engine.EntityID | undefined {
    return this._selectedEntityID
  }

  buildEntity(props: Engine.EntityProps): Entity {
    const entity = new Entity(props)
    this._entities.push(entity)
    const entityObject = entity.getObject()
    if (entityObject) {
      this._scene.add(entityObject)
      const previouslyMadeHelper = this._lightHelpers.some(
        (helper) => helper.uuid === props.id
      )
      if (
        entityObject.type === "PointLight" &&
        !this.isPlaying &&
        !previouslyMadeHelper
      ) {
        console.debug("making helper")
        const sphereSize = 1
        const pointLightHelper = new THREE.PointLightHelper(
          entityObject as THREE.PointLight,
          sphereSize
        )
        pointLightHelper.uuid = entityObject.uuid
        this._scene.add(pointLightHelper)
        this._lightHelpers.push(pointLightHelper)
      }
    }
    return entity
  }

  private _startEntities() {
    this._entities.forEach((entity) => {
      entity.start()
    })
  }

  private _resetScene() {
    this._entities.forEach((entity) => {
      const object = entity.getObject()
      if (object) {
        this._scene.remove(object)
      }
      entity.destroy()
    })
    this._entities = []
  }

  private _buildScene() {
    if (!this._scenePayload) return
    const localPayloadCopy = deepClone<Engine.ScenePayload>(this._scenePayload)
    this._buildEntities(localPayloadCopy.sceneConfig.entities)
  }

  private _buildEntities(entities: Engine.EntityProps[]) {
    entities.forEach((entityProps) => {
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

  private _hideHelpers() {
    this._axes.visible = false
    this._gridHelper.visible = false

    if (this._selectionHelper) {
      this._selectionHelper.visible = false
    }

    this._lightHelpers.forEach((helper) => {
      helper.visible = false
    })
  }

  private _showHelpers() {
    this._axes.visible = true
    this._gridHelper.visible = true

    if (this._selectionHelper) {
      this._selectionHelper.visible = true
    }

    this._lightHelpers.forEach((helper) => {
      helper.visible = true
    })
  }
}
