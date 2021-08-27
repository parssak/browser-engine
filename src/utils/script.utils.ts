import { v4 as uuidv4 } from 'uuid';

const COMPONENT_DEF = `// @defineComponent`;
const baseScriptContent = `class Component {
  
  // <public>

  // </public>

  ${COMPONENT_DEF}

  start() {
    
  }

  update() {

  }
}`

export const generateNewScript = (name: string): Engine.Script => {
  const id = uuidv4();
  return {
    id,
    name,
    language: 'js',
    content: baseScriptContent,
    type: 'component'
  }
};

const initPropPlaceholder = '// <initPropPlaceholder />';

export const formatScriptString = (script: Engine.Script): string => {
  const formatted = `(${script.content})`;
  return formatted.replace(COMPONENT_DEF, `
          entity;
        
          constructor(entity) {
            this.entity = entity;
          }

          ${initPropPlaceholder}
        `);
};

export const injectInitSection = (scriptBody: string, props: Record<string, Engine.ComponentPropType>): string => {
  const actualInitSection = `
  init(props) {
    this.transform = this.entity.getComponent('Transform');
    ${Object.entries(props).map(([key, value]) => `this.${key} = props?.${key} ?? ${value};`).join('\n')}
  }`;
  return scriptBody.replace(initPropPlaceholder, actualInitSection);
}