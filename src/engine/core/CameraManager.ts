import * as THREE from 'three';
import SceneManager from './SceneManager';
export default class CameraManager {
  sceneManager: SceneManager;
  private renderer = new THREE.WebGLRenderer({ antialias: true });
  private renderElement: HTMLElement | undefined;
  private camera: THREE.PerspectiveCamera | undefined;

  constructor(sceneManager: SceneManager) {
    this.sceneManager = sceneManager;
}
  Start() {
    if (!this.renderElement) throw new Error("Cannot start camera before setting renderElement");
    this.renderer.setSize(this.renderElement.clientWidth, this.renderElement.clientHeight);
    this.renderElement.appendChild(this.renderer.domElement);
  }
  
  SetRenderElement(element: HTMLElement) {
    this.renderElement = element;
  }

  /** Handles recalibrating the camera when container is resized. */
  HandleResize() {
    if (!this.camera) return;
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

}