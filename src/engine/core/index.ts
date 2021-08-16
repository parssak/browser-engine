import Scene from './Scene'
import EventController from './EventController'
import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';
import excludedEntityProps from '../utils/excludedEntityProps';
import ComponentManager from './ComponentManager';
import SceneManager from './SceneManager';

/**
 * -  THREE-SETUP -
 * 
 * An Object-Oriented setup for three.js
 * 
 * By Parssa Kyanzadeh
 * www.parssak.com
 */

// All Entities use the same scene singleton
export const scene = new Scene();

new EventController(scene);

/**
 * Abstract Class Entity.
 *
 * @class Entity
 */
export default class Entity implements IEntity {
  name: string = "";
  _id = uuidv4();
  parent: IEntity | null = null
  children: IEntity[] = []
  mesh: THREE.Mesh;
  components: Record<ComponentType, IComponent> = {} // Standard components  & Custom Script Files

  constructor(props: IEntityProps) {
    const mat = props.material ?? new THREE.MeshBasicMaterial();
    const geometry = props.geometry ?? new THREE.BoxBufferGeometry();
    this.mesh = new THREE.Mesh(mat, geometry);

    if (props.children) {
      props.children.forEach(entityProps => {
        const child = SceneManager.CreateEntity(entityProps, this);
        Entity.AddChild(this, child);
      });
    }

    if (props.components) {
      props.components.forEach(([type, componentProps]) => this.AddComponent(type, componentProps));
    }
  }

  AddComponent(type: ComponentType, props: ComponentProps) {
    const component: IComponent | undefined = ComponentManager.CreateComponent(type, props, this);
    if (component) this.components[type] = component;
  }

  static AddChild(parent: Entity, child: Entity) { }

  Update() { };
  
  GetProps(): [string, any][] {
    const allProps = Object.entries(this);
    return allProps.filter(([key, _]) => !excludedEntityProps.some(prop => prop === key));
  };
}