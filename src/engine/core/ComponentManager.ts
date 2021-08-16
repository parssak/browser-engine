import * as ENGINE from '../../types';
import Component from "./Component";

const components: Record<ENGINE.ComponentType, Component> = {};

export default class ComponentManager {
  
  static GetComponentByType(type: ENGINE.ComponentType): Component | undefined {
    return components[type];
  };

  static CreateComponent(type: ENGINE.ComponentType, props: ENGINE.ComponentProps, entity: ENGINE.IEntity): Component | undefined {
    const component = this.GetComponentByType(type);
    if (!component) return undefined;
    // @ts-ignore TODO: Come back
    return new component(entity);
  }
}