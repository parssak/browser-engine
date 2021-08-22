import * as THREE from 'three';
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
    const component = this.getComponent(componentType);
    if (!component) {
      console.error(`Component ${componentType} not found`);
      return;
    }
  
    // Translate vector props 
    Object.entries(componentProps).forEach(([name, prop]) => {
      if (Array.isArray(prop)) {
        if (prop.length === 3) {
          componentProps[name] = new THREE.Vector3(prop[0], prop[1], prop[2]) as any;
        }
        else if (prop.length === 2) {
          componentProps[name] = new THREE.Vector2(prop[0], prop[1]) as any;
        }
      }
    });
    const componentInstance = new component();
    componentInstance.init(entity, componentProps);
    entity.components[componentType] = componentInstance;
  }
}