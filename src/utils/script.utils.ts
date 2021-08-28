import { v4 as uuidv4 } from "uuid"

// #region -- Component Scripts --
const COMPONENT_DEF = `// @defineComponent`
const BASE_SCRIPT_CONTENT = `class Component {
  
  // <public>

  // </public>

  ${COMPONENT_DEF}

  start() {
    
  }

  update() {

  }
}`

export const generateNewScript = (name: string): Engine.Script => {
  const id = uuidv4()
  return {
    id,
    name,
    language: "js",
    content: BASE_SCRIPT_CONTENT,
    type: "component",
  }
}

const initPropPlaceholder = "// <initPropPlaceholder />"

export const formatScriptString = (script: Engine.Script): string => {
  const formatted = `(${script.content})`
  return formatted.replace(
    COMPONENT_DEF,
    `
          entity;
        
          constructor(entity) {
            this.entity = entity;
          }

          ${initPropPlaceholder}
        `
  )
}

export const injectInitSection = (
  scriptBody: string,
  props: Record<string, Engine.ComponentPropType>
): string => {
  const actualInitSection = `
  init(props) {
    this.transform = this.entity.getComponent('Transform');
    ${Object.entries(props)
      .map(([key, value]) => `this.${key} = props?.${key} ?? ${value};`)
      .join("\n")}
  }`
  return scriptBody.replace(initPropPlaceholder, actualInitSection)
}

// #endregion

// #region -- Shaders --

const BASE_VERTEX_SHADER_CONTENT = `
varying vec3 vColor;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const BASE_FRAGMENT_SHADER_CONTENT = `
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`

export const generateNewMaterial = (name: string): Engine.Material => {
  const id = uuidv4()
  return {
    id,
    name,
    vertexShader: `${BASE_VERTEX_SHADER_CONTENT}`,
    fragmentShader: `${BASE_FRAGMENT_SHADER_CONTENT}`,
    uniforms: {}
  }
}
