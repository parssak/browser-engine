import { FlyControls } from "../controls/FlyControls"
import { OrbitControls } from "../controls/OrbitControls"
import { TransformControls } from "../controls/TransformControls"
import SceneManager from "./SceneManager"

export default class ControlsManager {
  public static instance: ControlsManager
  private controls: any
  private transformControls: any

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
  }

  lookAt(target: THREE.Vector3) {
    if (this.controls) {
      // this.controls.target.copy(target)
    }
  }

  enableControls() {
    if (this.controls) this.controls.enabled = true
  }

  disableControls() {
    if (this.controls) this.controls.enabled = false
  }

  _setFlyControls(camera: THREE.Camera, domElement: HTMLElement) {
    if (this.controls) this.controls.enabled = false
    this.controls = new FlyControls(camera, domElement)
    this.controls.movementSpeed = 33
  }

  _setOrbitControls(camera: THREE.Camera, domElement: HTMLElement) {
    if (this.controls) {
      // this.controls.enabled = false;
      return
    }
    this.controls = new OrbitControls(camera, domElement)
    this.controls.listenToKeyEvents(window)
    this.transformControls = new TransformControls(camera, domElement)
    SceneManager.instance.addTransformControlsToScene(this.transformControls)
    this.transformControls.addEventListener("change", (e: any) =>
      console.log("change", e.target.object.position)
    )
    this.transformControls.addEventListener("dragging-changed", (e: any) => {
      console.log("dragging-changed", e.value)
      this.controls.enabled = !e.value
    })
  }

  addObjectControls(object: THREE.Object3D) {
    if (this.transformControls) {
      console.log("attaching transform controls to object")
      this.transformControls.attach(object)
    }
  }

  updateControls(deltaTime: number) {
    if (this.controls) this.controls.update(deltaTime)
  }
}
