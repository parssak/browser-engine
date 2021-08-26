import { v4 as uuidv4 } from 'uuid';

const COMPONENT_DEF = `// @defineComponent`;

export const generateNewScript = (name: string): Engine.Script => {
  const id = uuidv4();
  return {
    id,
    name,
    language: 'js',
    content: `
      class ${name} {
        ${COMPONENT_DEF}

        init() {

        }

        update() {
        
        }
      }
    `,
    type: 'component'
  }
};