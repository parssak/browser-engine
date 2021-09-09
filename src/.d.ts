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
    id: MaterialID
    material: MaterialProps
    fragmentShader: ScriptContent
    vertexShader: ScriptContent
  }

  // #endregion

  // #region -- Lighting --

  type Hexadecimal = number
  type LightType = "ambient" | "directional" | "hemisphere" | "point"
  interface LightProps {
    type: LightType
    color: THREE.ColorRepresentation
    color2?: THREE.ColorRepresentation
    intensity: number
  }

  // #endregion

  // #region -- Camera --
  type ControlType = "orbit" | "fly" | "firstPerson" | "fixed"

  interface CameraProps {
    fov: number
    near: number
    far: number
  }

  // #endregion

  // #region -- Entity --
  type EntityID = string
  type EntityType = "basic" | "light" | "camera" | "singleton" // TODO: Come up with a better name for this
  type GeometryType = "box" | "sphere" | "torus" | string
  type MaterialType = "basic" | "normal" | "lambert" | "phong" | string

  interface EntityProps {
    id: EntityID
    name: string
    children: EntityID[]
    components: Record<ComponentType, ComponentProps>
    type: EntityType
    visible: boolean
    castShadow: boolean
    receiveShadow: boolean
    geometry?: GeometryType
    material?: MaterialType
    lightProps?: LightProps
    cameraProps?: CameraProps
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
    entities: EntityProps[]
    materials: MaterialProps[]
  }

  interface ScenePayload {
    sceneConfig: SceneConfig // all entities & camera
    scripts: Script[] // all custom scripts
  }
  // #endregion
}
