import { v4 as uuidv4 } from 'uuid';

export const generateNewScript = (name: string): Engine.Script => {
  const id = uuidv4();
  return {
    id,
    name,
    language: 'js',
    content: `
      class ${name} {
        constructor() {
        }

        init() {

        }

        update() {
        
        }
      }
    `,
    type: 'component'
  }
};