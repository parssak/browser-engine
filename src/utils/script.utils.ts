import { v4 as uuidv4 } from 'uuid';

const COMPONENT_DEF = `// @defineComponent`;
const baseScriptContent = `class Name {
  
  // <public>

  // </public>

  ${COMPONENT_DEF}

  init(props) {

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

export const formatScriptString = (script: Engine.Script): string => {
  const formatted = `${script.content}`;
  return formatted.replace(COMPONENT_DEF, `
          entity;
        
          constructor(entity) {
            this.entity = entity;
          }
        `);
};