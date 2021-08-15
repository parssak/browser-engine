import * as THREE from 'three';
import oc from 'three-orbit-controls';
const OrbitControls = oc(THREE);

export default class CameraController {
  scene: THREE.Scene;
  fov = 45;
  near = 0.01;
  far = 20000;
  camera: THREE.PerspectiveCamera | undefined;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  container: any;
  controls: any;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }


  Initialize(container: any) {
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.container = container;
    this.container.appendChild(this.renderer.domElement);
    this.AddCamera();
    this.AddControls();
    window.addEventListener('resize', () => this.HandleResize())
  }


  /** Initializes Camera */
  AddCamera() {
    this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, this.near, this.far);
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
  }

  /** Initializes Controls */
  AddControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.39;
    if (this.camera) { this.camera.position.z = 200; }
    this.controls.update();
  }

  /** Handles recalibrating the camera when
   *  the window is resized.
   */
  HandleResize() {
    if (!this.camera) return;
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  /** Updates the controls, and re-renders everything.
   *  Note: This is called by the Scene update loop externally.
   */
  Update() {
    if (this.controls) {
      this.controls.update();
    }
    if (this.camera && this.scene) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}