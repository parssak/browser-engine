import { FlyControls } from "../controls/FlyControls"
import { OrbitControls } from "../controls/OrbitControls"

export default class ControlsManager {
  public static instance: ControlsManager
  private controls: any

  constructor() {
    if (ControlsManager.instance) return
    ControlsManager.instance = this
  }

  setControls(
    type: Engine.ControlType,
    camera: THREE.Camera,
    domElement: HTMLElement
  ) {
    
    if (this.controls) {
      return;
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
    if (this.controls) this.controls.enabled = false;
    this.controls = new OrbitControls(camera, domElement)
    this.controls.listenToKeyEvents(window)
  }

  updateControls(deltaTime: number) {
    if (this.controls) this.controls.update(deltaTime)
  }
}
