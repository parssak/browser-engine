import * as THREE from 'three';
import SceneManager from './SceneManager';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import oc from 'three-orbit-controls';
const OrbitControls = oc(THREE);

export default class CameraManager {
  public static instance: CameraManager;
  private renderer = new THREE.WebGLRenderer({ antialias: true });
  private renderElement: HTMLElement | undefined;
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private fov = 45;
  private near = 0.01;
  private far = 20000;
  private camera!: THREE.PerspectiveCamera;
  private controls: any;


  constructor() {
    if (CameraManager.instance) return CameraManager.instance;
    CameraManager.instance = this;
    this._setCamera();
    window.addEventListener('resize', () => this.handleResize());
  }

  setup(renderElement: HTMLElement, scene: THREE.Scene) {
    this.renderer.setSize(renderElement.clientWidth, renderElement.clientHeight);
    this.renderElement = renderElement;
    this.renderElement.appendChild(this.renderer.domElement);
    this.handleResize();
    this._setControls();
    this._setRaycaster();
    this._runSceneLoop(scene);
  }

  resetCamera() {
    this.renderer.setAnimationLoop(null);
  }

  handleClick(mouseX: number, mouseY: number) {
    const pointer = new THREE.Vector2(mouseX, mouseY);
    this.raycaster.setFromCamera(pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(SceneManager.instance.getScene().children, true).filter(e => e.object.type === 'Mesh');
    
    if (intersects.length > 0) {
      SceneManager.instance.select(intersects[0].object);
    }
    else {
      SceneManager.instance.select();
    }
  }

  private _setCamera() {
    if (!this.renderElement) {
      this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, this.near, this.far);
      this.camera.position.y = 10;
      this.camera.rotation.x = -0.1;
    }
  }

  private _runSceneLoop(scene: THREE.Scene) {
    this.renderer.setAnimationLoop((time: number) => this.update(scene));
  }

  private _setRaycaster() {
    this.raycaster = new THREE.Raycaster();
  }

  private _setControls() {
    this.camera.position.z = 50;
  }

  handleResize() {
    if (!this.renderElement) return;
    this.camera.aspect = this.renderElement.clientWidth / this.renderElement.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.renderElement.clientWidth, this.renderElement.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  update(scene: THREE.Scene) {
    this.renderer.render(scene, this.camera);
    SceneManager.instance.updateScene();
  }
}