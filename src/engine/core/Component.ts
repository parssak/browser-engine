import Entity from "./Entity";

export default abstract class Component {
  _entity!: Entity;

  init(entity: Entity, props: Engine.ComponentProps) {
    this._entity = entity;
  }

  abstract Update(): void;
}

// This is only used for generating the BaseComponentType for internal use, 
// when creating Components, extend the abstract Component class instead.
class BaseComponent extends Component {
  _entity!: Entity;

  init(entity: Entity, props: Engine.ComponentProps) {
    this._entity = entity;
  }

  Update() { }
}

export type BaseComponentType = typeof BaseComponent;