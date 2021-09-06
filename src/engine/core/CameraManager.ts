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
  private editCamera!: THREE.PerspectiveCamera
  private sceneCamera: THREE.PerspectiveCamera | undefined
  private currentControls: Engine.ControlType = "orbit"
  private clock = new THREE.Clock()

  constructor() {
    if (CameraManager.instance) return CameraManager.instance
    CameraManager.instance = this
    this.editCamera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      this.near,
      this.far
    )
    this._setCamera(this.editCamera)
    window.addEventListener("resize", () => this.handleResize())
  }

  setup(renderElement: HTMLElement, scene: THREE.Scene) {
    this.renderElement = renderElement
    this.renderElement.appendChild(this.renderer.domElement)
    this._setRenderer()
    this._setControls()
    this._setRaycaster()
    this._runSceneLoop(scene)
    this.handleResize()
  }

  setEditCamera(camera: THREE.PerspectiveCamera) {
    this.editCamera = camera
    this._setCamera(this.editCamera)
  }
  

  handleClick(mouseX: number, mouseY: number) {
    const pointer = new THREE.Vector2(mouseX, mouseY)
    this.raycaster.setFromCamera(pointer, this.camera)
    const intersects = this.raycaster
      .intersectObjects(SceneManager.instance.getScene().children, true)
      .filter((e) => e.object.type === "Mesh" || e.object.type === "PointLightHelper")
    if (intersects.length > 0) {
      const objectSelect = intersects[0].object
      if (objectSelect.type === "Mesh") {
        SceneManager.instance.select(objectSelect)
      } else if (objectSelect.type === "PointLightHelper") {
        SceneManager.instance.selectByID(objectSelect.uuid)
      }
    } else {
      SceneManager.instance.select()
    }
  }

  private _setCamera(cam: THREE.PerspectiveCamera) {
    this.camera = cam;
    this.camera.position.y = 10
    this.camera.rotation.x = -0.1
    this.camera.position.z = 50
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

  private _setRenderer() {
    if (!this.renderElement) return
    this.renderer.setSize(this.renderElement.clientWidth, this.renderElement.clientHeight)
    this.renderer.toneMapping = THREE.ReinhardToneMapping
    this.renderer.toneMappingExposure = 2
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.BasicShadowMap
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
  }

  getAspect() {
    return this.camera.aspect
  }

  handleResize() {
    if (!this.renderElement) return
    const dimensions = this.renderElement.getBoundingClientRect()
    const w = this.renderElement?.offsetParent?.clientWidth ?? dimensions.width
    const h = this.renderElement?.offsetParent?.clientHeight ?? dimensions.height
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
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
