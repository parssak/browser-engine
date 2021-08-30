import { v4 as uuidv4 } from "uuid"

const COMPONENT_DEF = `// @defineComponent`
const BASE_COMPONENT_SCRIPT_CONTENT = `class Component {
  
  // <public>

  // </public>

  ${COMPONENT_DEF}

  start() {
    
  }

  update() {

  }
}`

const BASE_VERTEX_SHADER_CONTENT = `uniform float time;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const BASE_FRAGMENT_SHADER_CONTENT = `uniform float time;

void main() {
  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}`

export const generateNewScript = (
  name: string,
  language: Engine.Language,
  type: Engine.ScriptType
): Engine.Script => {
  const id = uuidv4()
  let content = BASE_COMPONENT_SCRIPT_CONTENT

  switch (type) {
    case "component":
      content = BASE_COMPONENT_SCRIPT_CONTENT
      break
    case "vertex":
      content = BASE_VERTEX_SHADER_CONTENT
      break
    case "fragment":
      content = BASE_FRAGMENT_SHADER_CONTENT
      break
    default:
      break
  }

  return {
    id,
    name,
    language,
    content,
    type,
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

export const generateNewMaterial = (
  name: string,
  vertexShaderID: string,
  fragmentShaderID: string
): Engine.MaterialProps => {
  const id = uuidv4()
  return {
    id,
    name,
    vertexShaderID: vertexShaderID,
    fragmentShaderID: fragmentShaderID,
    uniforms: {},
  }
}
