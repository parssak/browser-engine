import { Object3D } from "three"
import { FlyControls } from "../controls/FlyControls"
import { OrbitControls } from "../controls/OrbitControls"
import { TransformControls } from "../controls/TransformControls"
import SceneManager from "./SceneManager"
import { recursiveSetHelper } from "./utils"

export default class ControlsManager {
  public static instance: ControlsManager
  private controls: any
  private transformControls!: THREE.Object3D

  constructor() {
    if (ControlsManager.instance) return
    ControlsManager.instance = this
  }

  setControls(type: Engine.ControlType, camera: THREE.Camera, domElement: HTMLElement) {
    if (this.controls) {
      return
    }
    switch (type) {
      case "fly":
        this._setFlyControls(camera, domElement)
        break
      case "orbit":
        this._setOrbitControls(camera, domElement)
        break
      default:
        console.warn(`Control type: ${type} not found`)
        break
    }
    this._initTransformControls(camera, domElement)
  }

  lookAt(target: THREE.Vector3) {}

  enableControls() {
    if (this.controls) this.controls.enabled = true
  }

  disableControls() {
    if (this.controls) this.controls.enabled = false
  }

  private _setFlyControls(camera: THREE.Camera, domElement: HTMLElement) {
    if (this.controls) this.controls.enabled = false
    this.controls = new FlyControls(camera, domElement)
    this.controls.movementSpeed = 33
  }

  private _setOrbitControls(camera: THREE.Camera, domElement: HTMLElement) {
    if (this.controls) {
      // this.controls.enabled = false;
      return
    }
    this.controls = new OrbitControls(camera, domElement)
    this.controls.listenToKeyEvents(window)
  }

  private _initTransformControls(camera: THREE.Camera, domElement: HTMLElement) {
    this.transformControls = new TransformControls(camera, domElement) as THREE.Object3D
    recursiveSetHelper(this.transformControls, "helper-block")

    SceneManager.instance.addTransformControlsToScene(this.transformControls)

    //  - Event listeners -

    // Updates position transform of object
    this.transformControls.addEventListener("change", (e: any) => {
      const object = e.target.object
      if (!object) return
      const objectID = object.uuid
      const updatedTransformComponent: Engine.ComponentProps = {
        position: { x: object.position.x, y: object.position.y, z: object.position.z },
        rotation: { x: object.rotation.x, y: object.rotation.y, z: object.rotation.z },
        scale: { x: object.scale.x, y: object.scale.y, z: object.scale.z },
      }
      const entityProps = SceneManager.instance.getSelectedEntityPayload()
      if (entityProps && entityProps.id === object.uuid) {
        entityProps.components.Transform = updatedTransformComponent
        SceneManager.instance.updateEntityPayload(objectID, entityProps)
      }
    })

    // Disabled external controls when using transform controls
    this.transformControls.addEventListener("dragging-changed", (e: any) => {
      this.controls.enabled = !e.value
    })

    // Key controls
    window.addEventListener("keydown", (event) => {
      const tControls = this.transformControls as any
      switch (event.key) {
        case "w":
          tControls.setMode("translate")
          break
        case "e":
          tControls.setMode("rotate")
          break
        case "r":
          tControls.setMode("scale")
          break

        default:
          break
      }
    })
  }

  addObjectControls(object: THREE.Object3D) {
    if (this.transformControls) {
      this.transformControls.attach(object)
    }
  }

  removeObjectControls() {
    if (this.transformControls) {
      // @ts-ignore
      this.transformControls.detach()
    }
  }

  updateControls(deltaTime: number) {
    if (this.controls) this.controls.update(deltaTime)
  }
}
