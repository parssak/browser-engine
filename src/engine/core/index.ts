// // import * as ENGINE from '../../types';
// import * as THREE from 'three';
// import excludedEntityProps from '../../utils/excludedEntityProps';
// import ComponentManager from './ComponentManager';
// import SceneManager from './SceneManager';
export const foo = "";
/**
 * -  THREE-SETUP -
 * 
 * An Object-Oriented setup for three.js
 * 
 * By Parssa Kyanzadeh
 * www.parssak.com
 */

// All Entities use the same scene singleton
// export const scene = new SceneManager();
// new EventController(scene);

/**
 * Abstract Class Entity.
 *
 * @class Entity
 */
// export default class Entity implements Engine.Entity {
//   name: string = "";
//   _id = uuidv4();
//   // parent: ENGINE.IEntity | null = null
//   children: ENGINE.IEntity[] = []
//   mesh: THREE.Mesh;
//   components: Record<ENGINE.ComponentType, ENGINE.IComponent> = {} // Standard components  & Custom Script Files

//   constructor(props: ENGINE.IEntityProps) {
//     const mat = props.material ?? new THREE.MeshBasicMaterial();
//     const geometry = props.geometry ?? new THREE.BoxBufferGeometry();
//     this.mesh = new THREE.Mesh(geometry, mat);

//     if (props.children) {
//       props.children.forEach(entityProps => {
//         const child = SceneManager.CreateEntity(entityProps, this);
//         Entity.AddChild(this, child);
//       });
//     }

//     if (props.components) {
//       props.components.forEach(([type, componentProps]) => this.AddComponent(type, componentProps));
//     }
//   }

//   AddComponent(type: ENGINE.ComponentType, props: ENGINE.ComponentProps) {
//     const component: ENGINE.IComponent | undefined = ComponentManager.CreateComponent(type, props, this);
//     if (component) this.components[type] = component;
//   }

//   static AddChild(parent: Entity, child: Entity) { }

//   Update() { };

//   GetProps(): [string, any][] {
//     const allProps = Object.entries(this);
//     return allProps.filter(([key, _]) => !excludedEntityProps.some(prop => prop === key));
//   };
// }