export default abstract class Component {
  name: ComponentType = "";
  _entity: IEntity;

  constructor(entity: IEntity) {
    this._entity = entity;
  }

  abstract Update(): void;
}