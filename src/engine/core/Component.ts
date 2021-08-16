import * as ENGINE from '../../types';
export default abstract class Component {
  name: ENGINE.ComponentType = "";
  _entity: ENGINE.IEntity;

  constructor(entity: ENGINE.IEntity) {
    this._entity = entity;
  }

  abstract Update(): void;
}