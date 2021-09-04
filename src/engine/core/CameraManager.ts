import * as THREE from "three"
import ControlsManager from "./ControlsManager"
import SceneManager from "./SceneManager"

export default class CameraManager {
  public static instance: CameraManager
  public renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  private renderElement: HTMLElement | undefined
  private raycaster: THREE.Raycaster = new THREE.Raycaster()
  private fov = 60
  private near = 0.01
  private far = 20000
  private camera!: THREE.PerspectiveCamera
  private currentControls: Engine.ControlType = "orbit"
  private clock = new THREE.Clock()

  constructor() {
    if (CameraManager.instance) return CameraManager.instance
    CameraManager.instance = this
    this._setCamera()
    window.addEventListener("resize", () => this.handleResize())
  }

  setup(renderElement: HTMLElement, scene: THREE.Scene) {
    this.renderer.setSize(renderElement.clientWidth, renderElement.clientHeight)
    this.renderElement = renderElement
    this.renderElement.appendChild(this.renderer.domElement)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    this.renderer.toneMappingExposure = 1.2
    this.handleResize()
    this._setControls()
    this._setRaycaster()
    this._runSceneLoop(scene)
  }

  handleClick(mouseX: number, mouseY: number) {
    const pointer = new THREE.Vector2(mouseX, mouseY)
    this.raycaster.setFromCamera(pointer, this.camera)
    const intersects = this.raycaster
      .intersectObjects(SceneManager.instance.getScene().children, true)
      .filter(e => e.object.type === "Mesh" || e.object.type === "PointLightHelper")
    if (intersects.length > 0) {
      const objectSelect = intersects[0].object;
      if (objectSelect.type === "Mesh") {
        SceneManager.instance.select(objectSelect)
      } else if (objectSelect.type === "PointLightHelper") {
        SceneManager.instance.selectByID(objectSelect.uuid)
      }
    } else {
      SceneManager.instance.select()
    }
  }

  private _setCamera() {
    if (!this.renderElement) {
      this.camera = new THREE.PerspectiveCamera(
        this.fov,
        window.innerWidth / window.innerHeight,
        this.near,
        this.far
      )
      this.camera.position.y = 10
      this.camera.rotation.x = -0.1
      this.camera.position.z = 50
    }
  }

  private _runSceneLoop(scene: THREE.Scene) {
    this.renderer.setAnimationLoop((time: number) => this.update(scene))
  }

  private _setRaycaster() {
    this.raycaster = new THREE.Raycaster()
  }

  private _setControls() {
    if (!this.renderElement) {
      return
    }
    ControlsManager.instance.setControls(
      this.currentControls,
      this.camera,
      this.renderer.domElement
    )
  }

  handleResize() {
    if (!this.renderElement) return
    const dimensions = this.renderElement.getBoundingClientRect()
    this.camera.aspect = dimensions.width / dimensions.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(dimensions.width, dimensions.height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }

  update(scene: THREE.Scene) {
    this.renderer.render(scene, this.camera)
    const deltaTime = this.clock.getDelta()
    const elapsedTime = this.clock.getElapsedTime()
    SceneManager.instance.updateScene(deltaTime, elapsedTime)
    ControlsManager.instance.updateControls(deltaTime)
  }
}
