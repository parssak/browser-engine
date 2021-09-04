import * as THREE from 'three';
import Component from './Component';
import ComponentManager from './ComponentManager';
import MaterialManager from './MaterialManager';
import GeometryManager from './GeometryManager';
import SceneManager from './SceneManager';

export default class Entity {
  public name: string = ""
  public type: Engine.EntityType | undefined
  public mesh: THREE.Mesh | undefined
  public light: THREE.Light | undefined
  public readonly id: Engine.EntityID
  public components: Record<Engine.ComponentType, Component> = {}

  constructor(props: Engine.EntityProps) {
    this.id = props.id
    this.name = props.name
    this.init(props)
  }

  init(props: Engine.EntityProps) {
    if (props.type === "basic" && props.geometry && props.material) {
      this._initMesh(props.material, props.geometry)
    } else if (props.type === "light" && props.lightProps) {
      this._initLight(props.lightProps)
    }
    this.initComponents(props.components)
  }

  private _initMesh(materialType: string, geometryType: string) {
    const mat = MaterialManager.instance.getMaterial(materialType)
    const geometry = GeometryManager.instance.getGeometry(geometryType)
    if (!this.mesh) {
      this.mesh = new THREE.Mesh(geometry, mat)
    } else {
      this.mesh.geometry = geometry
      this.mesh.material = mat
    }
    this.mesh.uuid = this.id
    this.mesh.name = this.name
  }

  private _initLight(lightProps: Engine.LightProps) {
    const createLight = (props: Engine.LightProps): THREE.Light => {
      switch (props.type) {
        case "ambient":
          return new THREE.AmbientLight(props.color, props.intensity)
        case "directional":
          return new THREE.DirectionalLight(props.color, props.intensity)
        case "hemisphere":
          return new THREE.HemisphereLight(props.color, props.color2, props.intensity)
        case "point":
          return new THREE.PointLight(props.color, props.intensity)
        default:
          return new THREE.AmbientLight(props.color, props.intensity)
      }
    }
    this.light = createLight(lightProps);
  }

  initComponents(components: Record<Engine.ComponentType, Engine.ComponentProps>) {
    this.components = {}
    Object.entries(components).forEach(([type, props]) => {
      ComponentManager.instance.setComponent(this, type, props)
    })
  }

  // TODO: Implement
  addChild(child: Entity) {}

  // TODO: Implement
  destroy() {}

  start() {
    if (SceneManager.isPlaying()) {
      this._startComponents()
    }
  }

  update(deltaTime: number, elapsedTime: number) {
    if (SceneManager.isPlaying()) {
      this._updateComponents()
    }

    const mat = this?.mesh?.material as any
    if (mat?.uniforms) {
      mat.uniforms.time.value = elapsedTime
    }
  }

  getComponent(componentName: string): Component | undefined {
    return this.components[componentName]
  }

  getObject(): THREE.Object3D | undefined {
    if (this.mesh) return this.mesh;
    else if (this.light) return this.light;
    return undefined;
  }

  private _startComponents() {
    Object.values(this.components).forEach((component) => component.start())
  }

  private _updateComponents() {
    Object.values(this.components).forEach((component) => component.update())
  }
}