declare namespace Engine {
  import { v4 as uuidv4 } from "uuid"
  const OrbitControls = oc(THREE)
  import oc from "three-orbit-controls"

  // #region -- Script --
  type Language = "ts" | "js" | "glsl"
  type ScriptType = "component" | "vertex" | "fragment"
  type ScriptID = string
  type ScriptContent = string
  type MaterialID = string

  interface Script {
    id: ScriptID
    name: string
    content: ScriptContent
    language: Language
    type: ScriptType
  }

  // #endregion

  // #region -- Material --

  interface MaterialProps {
    id: MaterialID
    name: string
    uniforms: Record<string, { value: unknown }>
    fragmentShaderID: ScriptID
    vertexShaderID: ScriptID
  }

  interface Material {
    material: MaterialProps
    fragmentShader: ScriptContent
    vertexShader: ScriptContent
  }

  // #endregion

  // #region -- Lighting --

  type Hexadecimal = number
  type LightType = "ambient" | "directional" | "hemisphere" | "point"
  // type LightID = string
  interface LightProps {
    // id: LightID
    // name: string
    type: LightType
    color: THREE.ColorRepresentation
    color2?: THREE.ColorRepresentation
    intensity: number
    // position: THREE.Vector3
  }

  // #endregion

  // #region -- Entity --
  type EntityID = string
  type EntityType = "basic" | "light" | "singleton" // TODO: Come up with a better name for this
  type GeometryType = "box" | "sphere" | "torus" | string
  type MaterialType = "basic" | "normal" | "lambert" | "phong" | string

  interface EntityProps {
    id: EntityID
    name: string
    children: EntityID[]
    components: Record<ComponentType, ComponentProps>
    type: EntityType
    geometry?: GeometryType
    material?: MaterialType
    lightProps?: LightProps
  }
  // #endregion

  // #region -- Camera --
  type ControlType = "orbit" | "fly" | "firstPerson" | "fixed"

  interface CameraProps {
    position: THREE.Vector3
    fov: number
    near: number
    far: number
    controls: ControlType
  }

  // #endregion

  // #region -- Component --

  type ComponentType = "transform" | string
  type ComponentPropType =
    | [number, number]
    | [number, number, number]
    | { x: number; y: number; z: number }
    | number
    | string // deprecate [number, number] & [number, number, number]
  type CombinedComponentPropName = `${ComponentType}--${string}`
  type ComponentProps = Record<string, ComponentPropType>

  // #endregion

  // #region -- Scene --
  interface SceneConfig {
    camera: CameraProps
    entities: EntityProps[]
    materials: MaterialProps[]
    // lights: LightProps[]
  }

  interface ScenePayload {
    sceneConfig: SceneConfig // all entities & camera
    scripts: Script[] // all custom scripts
  }
  // #endregion
}
