import * as THREE from 'three';
import Component from '../core/Component';
import Entity from '../core/Entity';
interface ITransformProps {
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
  scale?: THREE.Vector3;
}

export default class Transform extends Component {
  name = "transform";
  _entity!: Entity;

  public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public rotation: THREE.Euler = new THREE.Euler(0, 0, 0, 'XYZ');
  public scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);

  constructor(entity: Entity) {
    super(entity);
    this._entity = entity;
  }

  init(props?: ITransformProps) {
    console.debug('called init on transform');
    this.position = props?.position ?? this.position;
    this.rotation = props?.rotation ?? this.rotation;
    this.scale = props?.scale ?? this.scale;
    this.applyMatrix();
  }

  private applyPosition() {
    this._entity.mesh.position.setX(this.position.x);
    this._entity.mesh.position.setY(this.position.y);
    this._entity.mesh.position.setZ(this.position.z);
  }

  private applyRotation() {
    // TODO: Implement rotation
  }

  private applyScale() {
    this._entity.mesh.scale.setX(this.scale.x);
    this._entity.mesh.scale.setY(this.scale.y);
    this._entity.mesh.scale.setZ(this.scale.z);
  }

  private applyMatrix() {
    console.debug('applying matrix');
    if (!this._entity){ return; }
    this.applyPosition();
    this.applyPosition();
    this.applyScale();
  }

  update() {
    // if (this.scale.x >= 2) {
    //   this.dir = -1;
    // } else if (this.scale.x <= 0.2) {
    //   this.dir = 1;
    // }
    // this.scale.x += 0.1 * this.dir;
    this.applyMatrix();
  }
}
