import * as THREE from 'three';
import Component from './Component';
import Entity from './Entity';
interface ITransformProps {
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
  scale?: THREE.Vector3;
}

export default class Transform extends Component {
  entity: Entity;

  // <@public>
  public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public rotation: THREE.Euler = new THREE.Euler(0, 0, 0, 'XYZ');
  public scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  // </@public>

  constructor(entity: Entity) {
    super(entity);
    this.entity = entity;
  }

  init(props?: ITransformProps) {
    this.position = props?.position ?? this.position;
    this.rotation = props?.rotation ?? this.rotation;
    this.scale = props?.scale ?? this.scale;
    this.applyMatrix();
  }

  start() {
    this.applyMatrix();
  }

  private applyPosition() {
    this.entity.mesh.position.setX(this.position.x);
    this.entity.mesh.position.setY(this.position.y);
    this.entity.mesh.position.setZ(this.position.z);
  }

  private applyRotation() {
    this.entity.mesh.setRotationFromEuler(new THREE.Euler(this.rotation.x, this.rotation.y, this.rotation.z));
  }

  private applyScale() {
    this.entity.mesh.scale.setX(this.scale.x);
    this.entity.mesh.scale.setY(this.scale.y);
    this.entity.mesh.scale.setZ(this.scale.z);
  }

  private applyMatrix() {
    if (!this.entity) { return; }
    this.applyPosition();
    this.applyRotation();
    this.applyScale();
  }

  update() {
    this.applyMatrix();
  }
}
