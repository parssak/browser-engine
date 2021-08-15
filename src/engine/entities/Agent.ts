import * as THREE from 'three';
import Entity from '../core'

export default class Agent extends Entity {
  constructor(props: any) {
    super(props);
  }

  BuildMesh() {
    this.geometry = new THREE.CylinderGeometry(0, 4, 8, 10);
    this.material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  Start() {
    this.mesh.position.setX(this.transform.position.x);
    this.mesh.position.setY(this.transform.position.y);
    this.mesh.position.setZ(this.transform.position.z);
    this.speed = 0.03;
  }

  Update() {
    console.log(this.transform.position.x);
    this.mesh.position.setX(this.transform.position.x);
    this.mesh.position.setY(this.transform.position.y);
    this.mesh.position.setZ(this.transform.position.z);
    this.mesh.rotation.x += this.speed;
    this.mesh.rotation.y += this.speed;
  }
}