import * as THREE from 'three';
import Component from '../core/Component';
import * as ENGINE from '../../types';
interface ITransformProps {
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
  scale?: THREE.Vector3;
}

export default class Transform extends Component {
  public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public rotation: THREE.Euler = new THREE.Euler(0, 0, 0, 'XYZ');
  public scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);

  constructor(entity: ENGINE.IEntity, props?: ITransformProps) {
    super(entity);
    console.debug('created new transform');
    this.position = props?.position ?? this.position;
    this.rotation = props?.rotation ?? this.rotation;
    this.scale = props?.scale ?? this.scale;
  }

  Update() {
    // Position
    this._entity.mesh.position.setX(this.position.x);
    this._entity.mesh.position.setY(this.position.y);
    this._entity.mesh.position.setZ(this.position.z);

    // Rotation
    this._entity.mesh.rotation.x = this.rotation.x;
    this._entity.mesh.rotation.y = this.rotation.y;
    this._entity.mesh.rotation.z = this.rotation.z;

    // Scale
    this._entity.mesh.scale.setX(this.scale.x);
    this._entity.mesh.scale.setY(this.scale.y);
    this._entity.mesh.scale.setZ(this.scale.z);
  }
}
