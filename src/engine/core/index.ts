import Scene from './Scene'
import EventController from './EventController'
import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';
import excludedEntityProps from '../utils/excludedEntityProps';

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
export default abstract class Entity implements IEntity {
  _id = uuidv4();
  _scene = scene;
  inGroup: boolean = false;
  material: THREE.Material;
  geometry: THREE.BufferGeometry;
  mesh: THREE.Mesh;
  constructor(params?: IEntityParams) {
    this.inGroup = params?.entityParams?.inGroup ?? this.inGroup;
    this.material = new THREE.MeshBasicMaterial();
    this.geometry = new THREE.BoxBufferGeometry(3, 3, 3);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.Awake();
  }

  // Use this to define the mesh of the Entity
  abstract BuildMesh(): void;

  // Called Once on Initialization, before Start()
  Awake() {
    this.BuildMesh()
    if (!this.mesh) {
      throw new Error('Entity.BuildMesh() must set .mesh field')
    }
    this._scene.Add(this)
  }

  // Called every frame
  abstract Update(time?: number): void;


  GetProps(): [string, any][] {
    const allProps = Object.entries(this);
    return allProps.filter(([key, _]) => !excludedEntityProps.some(prop => prop === key));
  };
}