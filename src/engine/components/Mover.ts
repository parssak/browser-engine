import Component from '../core/Component';
import Entity from '../core/Entity';
import Transform from './Transform';

interface IMoverProps {
  speed?: number;
}
export default class Mover extends Component {
  speed: number = 0.05;
  transform!: Transform;

  init(props: IMoverProps) {
    this.speed = props?.speed ?? 0.05;
    this.transform = this.entity.components['Transform'] as Transform;
  }

  update() {
    this.transform.position.x += this.speed;
  }
}