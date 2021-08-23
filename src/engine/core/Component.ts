import Entity from "./Entity";

export default abstract class Component {
  _entity: Entity;

  constructor(entity: Entity) {
    this._entity = entity;
  }

  init(props: Engine.ComponentProps) {
  }

  abstract update(): void;
}

// This is only used for generating the BaseComponentType for internal use, 
// when creating Components, extend the abstract Component class instead.
class BaseComponent extends Component {
  _entity!: Entity;

  init(props: Engine.ComponentProps) { }

  update() { }
}

export type BaseComponentType = typeof BaseComponent;