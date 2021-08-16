import * as THREE from 'three';
import oc from 'three-orbit-controls';
import SceneManager from './SceneManager';
const OrbitControls = oc(THREE);
export default class CameraManager {
  sceneManager: SceneManager;
  private renderer = new THREE.WebGLRenderer({ antialias: true });
  private renderElement: HTMLElement | undefined;
  private camera: THREE.PerspectiveCamera | undefined;
  private fov = 45;
  private near = 0.01;
  private far = 20000;
  private controls: any;

  constructor(sceneManager: SceneManager) {
    this.sceneManager = sceneManager;
}
  Start() {
    console.debug('[CameraManager]: Starting...');
    if (!this.renderElement) throw new Error("Cannot start camera before setting renderElement");
    this.renderer.setSize(this.renderElement.clientWidth, this.renderElement.clientHeight);
    this.renderElement.appendChild(this.renderer.domElement);
    this.AddCamera();
    this.AddControls();
  }
  
  SetRenderElement(element: HTMLElement) {
    this.renderElement = element;
    console.debug('[CameraManager]: Set render element');
  }

  /** Handles recalibrating the camera when renderElement is resized. */
  HandleResize() {
    if (!this.camera || !this.renderElement) return;
    this.camera.aspect = this.renderElement.clientWidth / this.renderElement.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.renderElement.clientWidth, this.renderElement.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  AddCamera() {
    if (!this.renderElement) return;
    this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, this.near, this.far);
    this.camera.aspect = this.renderElement.clientWidth / this.renderElement.clientHeight;
    this.camera.updateProjectionMatrix();
  }

  AddControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.39;
    if (this.camera) { this.camera.position.z = 200; }
    this.controls.update();
  }

}