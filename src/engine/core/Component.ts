import Entity from "./Entity";

export default abstract class Component {
  entity: Entity;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  abstract init(props: Engine.ComponentProps): void;

  abstract start(): void;

  abstract update(): void;
}

// This is only used for generating the BaseComponentType for internal use, 
// when creating Components, extend the abstract Component class instead.
class BaseComponent extends Component {
  entity!: Entity;

  init(props: Engine.ComponentProps) { }

  start() { }

  update() { }
}

export type BaseComponentType = typeof BaseComponent;