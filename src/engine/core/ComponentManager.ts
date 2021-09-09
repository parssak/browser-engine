import * as THREE from 'three';
import Transform from "./Transform";
import { BaseComponentType } from "./Component";
import Entity from "./Entity";
export default class ComponentManager {
  public static instance: ComponentManager;
  private components: { [key: string]: { constructor: BaseComponentType, props: Engine.ComponentProps } } = {};

  constructor() {
    if (ComponentManager.instance) return;
    ComponentManager.instance = this;

    this.registerComponent("Transform", Transform, {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
    });
  }

  public getComponents() {
    return { ...this.components };
  };

  public registerComponent(componentName: string, component: BaseComponentType, props: Engine.ComponentProps): void {
    this.components[componentName] = { constructor: component, props };
  };

  public getComponentProps(name: Engine.ComponentType): Engine.ComponentProps | null {
    const componentProps = this.components[name]?.props ?? null;
    if (!componentProps) {
      return null;
    }
    return componentProps;
  }

  private getComponent(name: Engine.ComponentType): BaseComponentType | null {
    return this.components[name]?.constructor ?? null;
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
    const componentInstance = new component(entity);
    try {
      componentInstance.init(componentProps);
      entity.components[componentType] = componentInstance;
    } catch (e) {
      console.error('Error whilst initializing component', e);
    }
  }

  public renameComponent(newComponentName: string, oldComponentName: string) {
    const component = this.components[oldComponentName];
    if (!component) {
      console.error(`Component ${oldComponentName} not found`);
      return;
    }
    this.components[newComponentName] = component;
    delete this.components[oldComponentName];
  }
}