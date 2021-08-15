import * as THREE from 'three';
import Transform from '../components/Transform';
import Entity from '../core'

interface Props extends IEntityParams {
  transform?: {
    position?: THREE.Vector3;
    rotation?: THREE.Euler;
    scale?: THREE.Vector3;
  }
  speed?: number;
};
export default class Agent extends Entity {
  transform: Transform;
  speed: number = 0.03;

  constructor(props?: Props) {
    super(props);
    this.transform = new Transform(props?.transform);
    this.transform.SetMesh(this.mesh);
    this.speed = props?.speed ?? this.speed;
  }

  BuildMesh() {
    this.geometry = new THREE.CylinderGeometry(0, 4, 8, 10);
    this.material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }


  Update() {
    // console.log(this.transform.position.x);
    this.transform.Update();
    this.transform.rotation.x += this.speed;
    this.transform.rotation.y += this.speed;
    this.transform.rotation.z += this.speed;
  }
}