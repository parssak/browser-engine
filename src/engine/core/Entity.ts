import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';
import SceneManager from './SceneManager';
import Component from './Component';

export default class Entity {
  public name: string = "";
  public mesh: THREE.Mesh;
  private _id;
  private children: Entity[] = [];
  private components: Record<Engine.ComponentType, Component> = {};

  constructor(props: Engine.EntityProps) {
    const mat = props.material ?? new THREE.MeshBasicMaterial();
    const geometry = props.geometry ?? new THREE.BoxBufferGeometry();
    this.mesh = new THREE.Mesh(geometry, mat);
    this._id = props.id;

    // TODO: New approach to creating children in SceneManager.
    // props.children.forEach(entityProps => {
    //   const child: Entity = SceneManager.CreateEntity(entityProps, this);
    //   this.addChild(child);
    // });

    // TODO: build components
    this._initComponents(props.components);
  }

  private _initComponents(components: Record<Engine.ComponentType, Engine.ComponentProps>) {
    console.debug('Called init components:', components);
    // this.components = {};
  }

  addChild(child: Entity) {
    // TODO: Implement
  }

  addComponent(type: Engine.ComponentType, componentProps: Engine.ComponentProps) {
    // TODO: Implement
  }

  getProps(): Record<Engine.ComponentType, Engine.ComponentProps> {
    // TODO: Implement
    return {};
  }

  Update() {
    // TODO: Implement
    console.debug('calling update on entity', this._id);
    // TODO: If SceneManager.isRunning, call Update() for each component

  }
}