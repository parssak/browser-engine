import Component from "./Component";

export default class ComponentManager {
  
  static GetComponentByType(type: ComponentType): Component | undefined {
    return;
  };

  static CreateComponent(type: ComponentType, props: ComponentProps, entity: IEntity): Component | undefined {
    const component = this.GetComponentByType(type);
    if (!component) return undefined;
    // @ts-ignore TODO: Come back
    return new component(entity);
  }
}