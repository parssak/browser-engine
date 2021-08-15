import * as THREE from 'three';
import Entity from '../core'

const defaultProps = {
  transform: {
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Vector3(0, 0, 0),
    scale: new THREE.Vector3(1, 1, 1),
  }
}
export default class Agent extends Entity {
  constructor(props) {
    super({...defaultProps, ...props});
  }

  BuildMesh() {
    this.geometry = new THREE.CylinderGeometry(0, 4, 8, 10);
    this.geometry.rotateX(THREE.Math.degToRad(90));
    this.material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  Start() {
    super.Start();
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