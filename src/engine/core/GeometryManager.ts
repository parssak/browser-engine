import * as THREE from "three"

const planeBufferGeometry = new THREE.PlaneBufferGeometry(5, 5)
planeBufferGeometry.rotateX(-Math.PI / 2)
planeBufferGeometry.scale(5, 1, 5);
export default class GeometryManager {
  public static instance: GeometryManager
  geometries: Record<Engine.GeometryType, THREE.BufferGeometry> = {
    box: new THREE.BoxBufferGeometry(),
    sphere: new THREE.SphereBufferGeometry(1, 16, 16),
    cylinder: new THREE.CylinderBufferGeometry(1, 1, 1, 16, 1),
    torus: new THREE.TorusBufferGeometry(6, 1.1, 10, 32, 6.3),
    plane: planeBufferGeometry,
    tetrahedron: new THREE.TetrahedronBufferGeometry(),
    octahedron: new THREE.OctahedronBufferGeometry(),
    dodecahedron: new THREE.DodecahedronBufferGeometry(),
    icosahedron: new THREE.IcosahedronBufferGeometry(),
  }

  constructor() {
    if (GeometryManager.instance) return
    GeometryManager.instance = this
  }

  getGeometry(type: Engine.GeometryType): THREE.BufferGeometry {
    return this.geometries[type] ?? this.geometries.box
  }
}
