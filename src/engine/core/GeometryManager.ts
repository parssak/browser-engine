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
        return new THREE.BoxBufferGeometry();
      case 'sphere':
        return new THREE.SphereBufferGeometry(1, 16, 8);
      case 'cylinder':
        return new THREE.CylinderBufferGeometry(1, 1, 1, 16, 1);
      case 'torus':
        return new THREE.TorusBufferGeometry(6, 1.1, 10, 32, 6.3);
      case 'plane':
        return new THREE.PlaneBufferGeometry(1, 1);
      case 'tetrahedron':
        return new THREE.TetrahedronBufferGeometry();
      case 'octahedron':
        return new THREE.OctahedronBufferGeometry();
      case 'dodecahedron':
        return new THREE.DodecahedronBufferGeometry();
      case 'icosahedron':
        return new THREE.IcosahedronBufferGeometry();
      default:
        return new THREE.SphereBufferGeometry();
    }
  }
}