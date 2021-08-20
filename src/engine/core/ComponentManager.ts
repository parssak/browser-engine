const components: Record<Engine.ComponentType, Engine.Component> = {};

export default class ComponentManager {
  
  static GetComponentByType(type: Engine.ComponentType): Engine.Component | undefined {
    return components[type];
  };

  static CreateComponent(type: Engine.ComponentType, props: Engine.ComponentProps, entity: Engine.Entity): Engine.Component | undefined {
    const component = this.GetComponentByType(type);
    if (!component) return undefined;
    // @ts-ignore TODO: Come back
    return new component(entity);
  }
}