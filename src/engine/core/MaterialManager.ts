import * as THREE from 'three';

export default class MaterialManager {
  public static instance: MaterialManager;

  constructor() {
    if (MaterialManager.instance) return;
    MaterialManager.instance = this;
  }

  getMaterial(type: Engine.MaterialType): THREE.Material {
    switch (type) {
      case 'normal':
        return new THREE.MeshNormalMaterial();
      case 'basic':
        return new THREE.MeshBasicMaterial();
      case 'phong':
        return new THREE.MeshPhongMaterial();
      case 'lambert':
        return new THREE.MeshLambertMaterial();
      case 'wireframe':
        return new THREE.MeshBasicMaterial({ wireframe: true });
      default:
        return new THREE.MeshBasicMaterial();
    }
  }
}
