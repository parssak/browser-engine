import * as THREE from "three"
import Component from "./Component"
import ComponentManager from "./ComponentManager"
import MaterialManager from "./MaterialManager"
import GeometryManager from "./GeometryManager"
import SceneManager from "./SceneManager"
import { Color } from "three"

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

  public init(props: Engine.EntityProps) {
    this._initObject(props)
    this._appendIdentifiers(props.id, props.name)
    this._initComponents(props.components)
  }

  public start() {
    if (SceneManager.isPlaying()) {
      this._startComponents()
    }
  }

  public update(deltaTime: number, elapsedTime: number) {
    if (SceneManager.isPlaying()) {
      this._updateComponents()
    }

    const mat = this?.mesh?.material as any
    if (mat?.uniforms) {
      mat.uniforms.time.value = elapsedTime
    }
  }

  // TODO: Implement
  public destroy() {}

  public getComponent(componentName: string): Component | undefined {
    return this.components[componentName]
  }

  public getObject(): THREE.Object3D | undefined {
    if (this.mesh) return this.mesh
    else if (this.light) return this.light
    return undefined
  }

  private _startComponents() {
    Object.values(this.components).forEach((component) => component.start())
  }

  private _updateComponents() {
    Object.values(this.components).forEach((component) => component.update())
  }

  private _initComponents(
    components: Record<Engine.ComponentType, Engine.ComponentProps>
  ) {
    this.components = {}
    Object.entries(components).forEach(([type, props]) => {
      ComponentManager.instance.setComponent(this, type, props)
    })
  }

  private _initObject(props: Engine.EntityProps) {
    if (props.type === "basic" && props.geometry && props.material) {
      this._initMesh(props.material, props.geometry)
    } else if (props.type === "light" && props.lightProps) {
      this._initLight(props.lightProps)
    }
  }

  private _initMesh(materialType: string, geometryType: string) {
    const mat = MaterialManager.instance.getMaterial(materialType)
    const geometry = GeometryManager.instance.getGeometry(geometryType)
    if (!this.mesh) {
      this.mesh = new THREE.Mesh(geometry, mat)
      this.mesh.castShadow = true
      this.mesh.receiveShadow = true
    } else {
      this.mesh.geometry = geometry
      this.mesh.material = mat
    }
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
    
    if (!this.light) {
      this.light = createLight(lightProps)
    }

    this.light.castShadow = true
    
    this.light.intensity = lightProps.intensity
    const downcastedLight = this.light as any

    if (downcastedLight.color) {
      downcastedLight.color = new Color(lightProps.color)
    }
    
    else if (downcastedLight.groundColor) {
      downcastedLight.groundColor = new Color(lightProps.color)
    }

    if (downcastedLight.skyColor && lightProps.color2) {
      downcastedLight.skyColor = new Color(lightProps.color2)
    }
  }

  private _appendIdentifiers(id: string, name: string) {
    const object: THREE.Object3D | undefined = this.getObject()
    if (!object) return
    object.uuid = id
    object.name = name
  }
}
