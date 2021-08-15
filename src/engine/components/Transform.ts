import * as THREE from 'three';

interface ITransformProps {
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
  scale?: THREE.Vector3;
}

export default class Transform {
  public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public rotation: THREE.Euler = new THREE.Euler(0, 0, 0, 'XYZ');
  public scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  private _mesh?: THREE.Mesh;

  constructor(props?: ITransformProps) {
    console.debug('created new transform');
    this.position = props?.position ?? this.position;
    this.rotation = props?.rotation ?? this.rotation;
    this.scale = props?.scale ?? this.scale;
  }

  SetMesh(mesh: THREE.Mesh) {
    console.debug('set mesh!')
    this._mesh = mesh;
  }

  Update() {
    if (!this._mesh) {
      console.error('Attempting to update transform without setting mesh!');
      return;
    }
    this._mesh.position.setX(this.position.x);
    this._mesh.position.setY(this.position.y);
    this._mesh.position.setZ(this.position.z);
  }
}
