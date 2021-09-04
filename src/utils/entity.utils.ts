import { v4 as uuidv4 } from 'uuid';
export const generateNewEntity = (): Engine.EntityProps => {
  const id = uuidv4();
  return {
    id,
    name: "New Entity",
    geometry: 'box',
    material: 'normal',
    type: "basic",
    children: [],
    components: {
      Transform: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      }
    },
  };
}

export const generateNewLight = (): Engine.EntityProps => {
  const id = uuidv4()
  return {
    id,
    name: "New Light",
    // geometry: "box",
    // material: "normal",
    type: "light",
    lightProps: {
      intensity: 0.7,
      type: "ambient",
      color: "rgb(255,0,0)",
    },
    children: [],
    components: {
      Transform: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    },
  }
}