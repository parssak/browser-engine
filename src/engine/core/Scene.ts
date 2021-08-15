import * as THREE from 'three';
import CameraController from './CameraController'
export default class Scene {
  // todo determine if these need to be public
  public entities: IEntity[] = [];
  public scene = new THREE.Scene();
  public cameraController = new CameraController(this.scene);
  public running = false;

  constructor() {
    this.SetupScene()
  }

  /** Include any Scene setup logic here */
  SetupScene() {
  }

  /**
   * Adds a new mesh to the scene.
   * @param {THREE.Mesh} mesh New Mesh to add to scene
   */
  Add(entity: IEntity) {
    if (entity.mesh) {
      this.scene.add(entity.mesh)
      this.entities.push(entity)
    }
    else if (entity.group) {
      this.scene.add(entity.group)
      this.entities.push(entity)
    }
  }

  /**
   * Runs once per frame, call's Update for each entity
   * @param {float} time Time since the Scene began
   */
  Update(time: number) {
    if (this.running)
      this.entities.forEach(entity => !entity.inGroup && entity.Update(time));
    this.cameraController.Update()
  }

  Run() {
    if (!this.running || !this.cameraController || !this.cameraController.renderer) {
      this?.cameraController?.renderer?.setAnimationLoop(time => this.Update(time))
      this.running = true;
    }
  }

  Stop() {
    if (this.running) {
      this.running = false;
    }
  }

  Initialize(container: any) {
    this.cameraController.Initialize(container);
  }
}