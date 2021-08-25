import * as THREE from 'three';
import Component from './Component';
import ComponentManager from './ComponentManager';
import MaterialManager from './MaterialManager';
import GeometryManager from './GeometryManager';
import SceneManager from './SceneManager';

export default class Entity {
  public name: string = "";
  public mesh!: THREE.Mesh;
  public readonly id: Engine.EntityID;
  public components: Record<Engine.ComponentType, Component> = {};

  constructor(props: Engine.EntityProps) {
    this.id = props.id;
    this.name = props.name;
    this.init(props);
  }

  init(props: Engine.EntityProps) {
    this.initMesh(props);
    this.initComponents(props.components);
  }

  initMesh(props: Engine.EntityProps) {
    const mat = MaterialManager.instance.getMaterial(props.material);
    const geometry = GeometryManager.instance.getGeometry(props.geometry);
    if (!this.mesh) {
      this.mesh = new THREE.Mesh(geometry, mat);
    }
    else {
      this.mesh.geometry = geometry;
      this.mesh.material = mat;
    }
    this.mesh.uuid = this.id;
    this.mesh.name = this.name;
  }

  initComponents(components: Record<Engine.ComponentType, Engine.ComponentProps>) {
    this.components = {};
    Object.entries(components).forEach(([type, props]) => {
      ComponentManager.instance.setComponent(this, type, props);
    })
  }

  // TODO: Implement
  addChild(child: Entity) { }

  // TODO: Implement
  destroy() { }

  update() {
    if (SceneManager.isPlaying()) {
      this._updateComponents();
    }
  }

  private _updateComponents() {
    Object.values(this.components).forEach((component) => component.update())
  }
}