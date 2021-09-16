import * as THREE from "three"
import Component from "./Component"
import ComponentManager from "./ComponentManager"
import MaterialManager from "./MaterialManager"
import GeometryManager from "./GeometryManager"
import SceneManager from "./SceneManager"
import { Color } from "three"
import CameraManager from "./CameraManager"

export default class Entity {
  public readonly id: Engine.EntityID
  public name: string = ""
  public type: Engine.EntityType | undefined
  public components: Record<Engine.ComponentType, Component> = {}
  public children: Entity[] = [];

  // Based on "type", an entity either has a mesh, light, or camera.
  private mesh: THREE.Mesh | undefined
  private light: THREE.Light | undefined
  private camera: THREE.Camera | undefined

  constructor(props: Engine.EntityProps) {
    this.id = props.id
    this.name = props.name
    this.type = props.type
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

  public addChild(entity: Entity) {
    this.children.push(entity)
    const obj = this.getObject()
    // todo left off here
  }
 
  public destroy() {
    // TODO: Implement
    if (this.mesh) {
      this.mesh.geometry.dispose()
      if (this.mesh.material instanceof THREE.Material) {
        this.mesh.material.dispose()
      }
    }
  }

  public getComponent(componentName: string): Component | undefined {
    return this.components[componentName]
  }

  public getObject(): THREE.Object3D | undefined {
    return this.mesh || this.light || this.camera
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
    } else if (props.type === "camera" && props.cameraProps) {
      this._initCamera(props.cameraProps)
    }

    const obj = this.getObject()
    if (obj) {
      obj.visible = props.visible
      obj.castShadow = props.castShadow
      obj.receiveShadow = props.receiveShadow
    }
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
  }

  private _initCamera(cameraProps: Engine.CameraProps) {
    if (!this.camera) {
      this.camera = new THREE.PerspectiveCamera(
        cameraProps.fov,
        CameraManager.instance.getAspect(),
        cameraProps.near,
        cameraProps.far
      )
    } else {
      const cam = this.camera as THREE.PerspectiveCamera
      cam.fov = cameraProps.fov
      cam.aspect = CameraManager.instance.getAspect()
      cam.near = cameraProps.near
      cam.far = cameraProps.far
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

    this.light.intensity = lightProps.intensity
    const downcastedLight = this.light as any

    if (downcastedLight.color) {
      downcastedLight.color = new Color(lightProps.color)
    } else if (downcastedLight.groundColor) {
      downcastedLight.groundColor = new Color(lightProps.color)
    }

    if (downcastedLight.skyColor && lightProps.color2) {
      downcastedLight.skyColor = new Color(lightProps.color2)
    }
  }

  private _appendIdentifiers(id: string, name: string) {
    const obj: THREE.Object3D | undefined = this.getObject()
    if (!obj) return
    obj.uuid = id
    obj.name = name
  }
}
