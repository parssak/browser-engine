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
  private children: Entity[] = [];
  components: Record<Engine.ComponentType, Component> = {};

  constructor(props: Engine.EntityProps) {
    this.id = props.id;
    this.name = props.name;
    this.init(props);
  }

  init(props: Engine.EntityProps) {
    const mat = MaterialManager.instance.getMaterial(props.material);
    const geometry = GeometryManager.instance.getGeometry(props.geometry);
    this.mesh = new THREE.Mesh(geometry, mat);
    this.mesh.uuid = this.id;
    this.mesh.name = this.name;
    console.debug('called init');
    // TODO: New approach to creating children in SceneManager.
    // props.children.forEach(entityProps => {
    //   const child: Entity = SceneManager.CreateEntity(entityProps, this);
    //   this.addChild(child);
    // });

    // TODO: build components
    this.initComponents(props.components);
  }

  initComponents(components: Record<Engine.ComponentType, Engine.ComponentProps>) {
    Object.entries(components).forEach(([type, props]) => {
      ComponentManager.instance.setComponent(this, type, props);
    })
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

  destroy() {

    // TODO: Implement

    // todo: do i need to be doing this?
    // this.mesh.geometry.dispose();
  }

  update() {
    if (SceneManager.isPlaying()) {
      this._updateComponents();
    }
  }

  private _updateComponents() {
    Object.values(this.components).forEach((component) => component.update())
  }
}