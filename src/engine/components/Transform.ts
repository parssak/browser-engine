import * as THREE from 'three';

interface ITransformProps {
  mesh: THREE.Mesh;
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
  scale?: THREE.Vector3;
}

export default class Transform {
  public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public rotation: THREE.Euler = new THREE.Euler(0, 0, 0, 'XYZ');
  public scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  private mesh: THREE.Mesh;

  constructor(props: ITransformProps) {
    this.mesh = props.mesh;
    this.position = props.position ?? this.position;
    this.rotation = props.rotation ?? this.rotation;
    this.scale = props.scale ?? this.scale;
  }

  Update() {
    this.position.copy(this.mesh.position);
    this.rotation.copy(this.mesh.rotation);
    this.scale.copy(this.mesh.scale);
  }
}
