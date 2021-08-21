import Transform from "../components/Transform";
import Component, { BaseComponentType } from "./Component";
import Entity from "./Entity";
export default class ComponentManager {
  public static instance: ComponentManager;
  private components: { [key: string]: BaseComponentType } = {};
  
  constructor() {
    if (ComponentManager.instance) return;
    ComponentManager.instance = this;
    this.registerComponent('transform', Transform);
  }

  public registerComponent(name: Engine.ComponentType, component: BaseComponentType): void {
    this.components[name] = component;
  };

  private getComponent(name: Engine.ComponentType): BaseComponentType | null {
    return this.components[name] ?? null;
  }

  public setComponent(entity: Entity, componentType: Engine.ComponentType, componentProps: Engine.ComponentProps): void {
    // TODO: Implement
    // log all params
    console.debug(`setComponent(${entity}, ${componentType}, ${componentProps})`);
    
  }
}