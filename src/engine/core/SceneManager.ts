import * as THREE from "three"
import { deepClone } from "../../utils"
import CameraManager from "./CameraManager"
import ControlsManager from "./ControlsManager"
import Entity from "./Entity"
import MaterialManager from "./MaterialManager"
import { recursiveSetHelper } from "./utils"
export default class SceneManager {
  public static instance: SceneManager
  private isPlaying: boolean = false // If true, in play mode, else in edit mode
  private _scene!: THREE.Scene
  private _entities: Entity[] = []
  private _scenePayload: Engine.ScenePayload | undefined
  private _scenePayloadInitialized = false

  // Selection
  private _selectedEntityID: Engine.EntityID | undefined

  // Helpers
  private _axes = new THREE.AxesHelper(2)
  private _gridHelper = new THREE.GridHelper(1000, 200)
  private _cameraHelper = new THREE.CameraHelper(new THREE.PerspectiveCamera())
  private _selectionHelper!: THREE.BoxHelper
  private _lightHelpers: THREE.PointLightHelper[] = []

  constructor() {
    if (SceneManager.instance) {
      return SceneManager.instance
    }
    SceneManager.instance = this
    this._scene = new THREE.Scene()

    recursiveSetHelper(this._axes)
    this._scene.add(this._axes)

    recursiveSetHelper(this._gridHelper)
    this._scene.add(this._gridHelper)

    recursiveSetHelper(this._selectionHelper)
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

  // ! Only to be used for adding transform controls from ControlsManager
  addTransformControlsToScene(transformControls: any) {
    this._scene.add(transformControls)
  }

  getScene(): THREE.Scene {
    return this._scene
  }

  setScenePayload(payload: Engine.ScenePayload, forInit?: boolean) {
    if (forInit && this._scenePayloadInitialized) return
    this._scenePayload = payload
    this._compileMaterials()
    if (forInit) {
      this._scenePayloadInitialized = true
    }
  }

  setSceneMaterials(payload: Engine.MaterialProps[]) {
    if (!this._scenePayload) return
    this._scenePayload.sceneConfig.materials = payload
    // this._compileMaterials()
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
    const object = this._entities.find((e) => e.id === entityID)?.getObject() ?? undefined
    if (object) {
      ControlsManager.instance.lookAt(object.position)
      this.select(object)
    }
  }

  /** Sets Entity with corresponding object as selected
   * @param object THREE.Object3D
   */
  select(object: THREE.Object3D) {
    if (this.isPlaying) return

    if (object) {
      ControlsManager.instance.addObjectControls(object)
      this._selectedEntityID = object.uuid
      this._selectionHelper.setFromObject(object)
      if (object.type === "Mesh") {
        this._selectionHelper.visible = true
      } else if (object.type === "PerspectiveCamera") {
        this._cameraHelper.visible = true
      }
      return
    }
    this._cameraHelper.visible = false
  }

  deselect() {
    this._selectionHelper.visible = false
    this._selectedEntityID = undefined
    this._cameraHelper.visible = false
    ControlsManager.instance.removeObjectControls()
  }

  getSelectedEntity(): Engine.EntityID | undefined {
    return this._selectedEntityID
  }

  buildEntity(props: Engine.EntityProps): Entity {
    console.debug('build entity')
    const entity = new Entity(props)
    this._entities.push(entity)
    const entityObject = entity.getObject()
    if (entityObject) {
      this._scene.add(entityObject)
      if (entityObject.type === "PointLight" && !this.isPlaying) {
        const previouslyMadeHelper = this._lightHelpers.some(
          (helper) => helper.uuid === props.id
        )
        if (!previouslyMadeHelper) {
          const sphereSize = 1
          const pointLightHelper = new THREE.PointLightHelper(
            entityObject as THREE.PointLight,
            sphereSize
          )
          pointLightHelper.uuid = entityObject.uuid
          this._scene.add(pointLightHelper)
          this._lightHelpers.push(pointLightHelper)
        }
      } else if (entityObject.type === "DirectionalLight") {
        const light = entityObject as any
        this._scene.add(light.target)
      } else if (entityObject.type === "PerspectiveCamera") {
        this._cameraHelper = new THREE.CameraHelper(entityObject as THREE.Camera)
        recursiveSetHelper(this._cameraHelper)
        this._cameraHelper.uuid = entityObject.uuid
        this._cameraHelper.visible = false
        this._scene.add(this._cameraHelper)
      }
    }
    return entity
  }

  destroyEntity(entityID: Engine.EntityID) {
    if (entityID === this._selectedEntityID) {
      this.deselect()
    }
    const entity = this._entities.find((e) => e.id === entityID)
    if (entity) {
      const object = entity.getObject()
      if (object) {
        this._scene.remove(object)
      }
      entity.destroy()
      if (entity.children.length > 0) {
        entity.children.forEach(c => this.destroyEntity(c.id));
      }
    }
  }

  renameComponentInEntities(newComponentName: string, oldComponentName: string) {
    this._scenePayload?.sceneConfig.entities.forEach((entity) => {
      const component = entity.components[oldComponentName]
      if (component) {
        entity.components[newComponentName] = component
        delete entity.components[oldComponentName]
      }
    })
  }

  refreshEntitiesMaterial(newMaterial: THREE.Material) {
    this._entities.forEach((entity) => {
      const object = entity.getObject() as any
      if (object && object.material && object.material.uuid === newMaterial.uuid) {
        object.material = newMaterial
      }
    })
  }

  /** Adds any missing prop fields to all entities component props,
   *  and removes any present props that are not defined in componentProps */
  updateEntitiesComponentProps(
    componentName: string,
    componentProps: Engine.ComponentProps
  ) {
    this._scenePayload?.sceneConfig.entities.forEach((entity) => {
      const entityComponentProps = entity.components[componentName]
      if (entityComponentProps) {
        Object.keys(componentProps).forEach((propName) => {
          if (!entityComponentProps[propName]) {
            entityComponentProps[propName] = componentProps[propName]
          }
        })

        Object.keys(entityComponentProps).forEach((propName) => {
          if (!componentProps[propName]) {
            delete entityComponentProps[propName]
          }
        })
      }
    })
  }

  removeFromScene(object: THREE.Object3D) {
    this._scene.remove(object)
  }

  private _startEntities() {
    this._entities.forEach((entity) => {
      entity.start()
    })
  }

  private _resetScene() {
    this._entities.forEach((entity) => {
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
    this._entities.forEach((entity) => {
      this._bindHierarchy(entity)
    })
  }

  private _bindHierarchy(entity: Entity) {
    if (!this._scenePayload) return;
    const entityProps = this._scenePayload.sceneConfig.entities.find(
      (e) => e.id === entity.id
    );
    if (!entityProps) return;
    const parentID = entityProps.parent;
    if (parentID) {
      const parentEntity = this._entities.find((e) => e.id === parentID);
      if (parentEntity) {
        parentEntity.addChild(entity);
      }
    }


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
        id: material.id,
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
    this._cameraHelper.visible = false
    ControlsManager.instance.removeObjectControls()

    if (this._selectionHelper) {
      this._selectionHelper.visible = false
    }

    this._lightHelpers.forEach((helper) => {
      helper.dispose()
      this._scene.remove(helper)
    })
    this._lightHelpers = []
  }

  private _showHelpers() {
    this._axes.visible = true
    this._gridHelper.visible = true
    if (this._selectionHelper) {
      this._selectionHelper.visible = true
      if (this._selectedEntityID) {
        const object =
          this._entities.find((e) => e.id === this._selectedEntityID)?.getObject() ??
          undefined
        if (object) {
          ControlsManager.instance.addObjectControls(object)
        }
      }
    }
  }
}
