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
  speed: number = 0.1;
  transform!: Transform;

  init(entity: Entity, props: IMoverProps) {
    this._entity = entity;
    this.speed = props?.speed ?? 0.1;
    this.transform = this._entity.components['transform'] as Transform;
  }

  update() {
    console.debug('updating mover');
    this.transform.position.x += this.speed;
  }
}