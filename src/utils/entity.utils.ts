import { v4 as uuidv4 } from 'uuid';
export const generateNewEntity = (): Engine.EntityProps => {
  const id = uuidv4();
  return {
    id,
    name: "New Entity",
    geometry: 'box',
    material: 'normal',
    children: [],
    components: {
      transform: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      }
    },
  };
}