import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';
import SceneManager from './SceneManager';

export default class Entity {
  public name: string = "";
  public mesh: THREE.Mesh;
  private _id = uuidv4();
  private children: Entity[] = [];
  private components: Record<Engine.ComponentType, Engine.Component>;

  constructor(props: Engine.EntityProps) {
    const mat = props.material ?? new THREE.MeshBasicMaterial();
    const geometry = props.geometry ?? new THREE.BoxBufferGeometry();
    this.mesh = new THREE.Mesh(geometry, mat);

    props.children.forEach(entityProps => {
      const child: Entity = SceneManager.CreateEntity(entityProps, this);
      this.addChild(child);
    });

    // TODO: build components
    this.components = {};
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