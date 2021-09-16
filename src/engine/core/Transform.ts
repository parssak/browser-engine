import * as THREE from "three"
import { Vector3 } from "three"
import Component from "./Component"
import Entity from "./Entity"
interface ITransformProps {
  position?: THREE.Vector3
  rotation?: THREE.Euler
  scale?: THREE.Vector3
}

export default class Transform extends Component {
  entity: Entity
  _object: THREE.Object3D

  // <@public>
  public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  public rotation: THREE.Euler = new THREE.Euler(0, 0, 0, "XYZ")
  public scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1)
  // </@public>

  constructor(entity: Entity) {
    super(entity)
    this.entity = entity
    this._object = this.entity.getObject() as THREE.Object3D
  }

  init(props?: ITransformProps) {
    this.position = props?.position ? new THREE.Vector3(props.position.x, props.position.y, props.position.z) : this.position
    this.rotation = props?.rotation ? new THREE.Euler(props.rotation.x, props.rotation.y, props.rotation.z, 'XYZ'): this.rotation
    this.scale = props?.scale ? new THREE.Vector3(props.scale.x, props.scale.y, props.scale.z) : this.scale
    this.applyMatrix()
  }

  start() {
    this.applyMatrix()
  }

  lookAt(location: THREE.Vector3) {
    console.debug('look at');
    const rotation = new THREE.Euler(location.x, location.y, location.z);
    this.rotation = rotation;
  }

  moveForward(distance: number) {
    this.position.addScaledVector(this.rotation.toVector3(), distance)
  }

  private applyPosition() {
    this._object.position.set(this.position.x, this.position.y, this.position.z)
  }

  private applyRotation() {
    this._object.setRotationFromEuler(
      new THREE.Euler(this.rotation.x, this.rotation.y, this.rotation.z)
    )
  }

  private applyScale() {
    this._object.scale.set(this.scale.x, this.scale.y, this.scale.z)
  }

  private applyMatrix() {
    if (!this.entity) {
      return
    }
    this.applyPosition()
    this.applyRotation()
    this.applyScale()
  }

  update() {
    this.applyMatrix()
  }
}
