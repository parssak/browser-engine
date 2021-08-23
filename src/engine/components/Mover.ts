import * as THREE from 'three';
import Component from '../core/Component';
import Entity from '../core/Entity';

interface IMoverProps {
  speed?: number;
}
export default class Mover extends Component {
  name = "mover";
  _entity!: Entity;
  speed: number = 0.1;

  init(entity: Entity, props: IMoverProps) {
    this._entity = entity;
    this.speed = props?.speed ?? 0.1;
  }

  update() {
    
  }
}