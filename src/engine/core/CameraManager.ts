import * as THREE from 'three';
import oc from 'three-orbit-controls';
const OrbitControls = oc(THREE);

export default class CameraManager {
  public static instance: CameraManager;

  constructor() {
    if (CameraManager.instance) return;
    CameraManager.instance = this;
  }
}