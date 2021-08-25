import * as THREE from 'three';
import Component from '../core/Component';
import Entity from '../core/Entity';
import Transform from './Transform';

interface IMoverProps {
  speed?: number;
}
export default class Mover extends Component {
  name = "mover";
  _entity!: Entity;
  speed: number = 0.05;
  transform!: Transform;

  constructor(entity: Entity) {
    super(entity);
    this._entity = entity;
  }

  init(props: IMoverProps) {
    this.speed = props?.speed ?? 0.05;
    this.transform = this._entity.components['transform'] as Transform;
  }

  update() {
    this.transform.rotation.x += this.speed;
    this.transform.rotation.y += this.speed;
    this.transform.position.x += this.speed;
  }
}