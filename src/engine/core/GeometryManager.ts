import * as THREE from 'three';

export default class GeometryManager {
  public static instance: GeometryManager;

  constructor() {
    if (GeometryManager.instance) return;
    GeometryManager.instance = this;
  }

  getGeometry(type: Engine.MaterialType): THREE.BufferGeometry {
    switch (type) {
      case 'box':
        return new THREE.BoxBufferGeometry;
      case 'sphere':
      default:
        return new THREE.SphereBufferGeometry;
    }
  }
}