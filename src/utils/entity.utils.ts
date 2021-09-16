import { v4 as uuidv4 } from 'uuid';
export const generateNewEntity = (): Engine.EntityProps => {
  const id = uuidv4();
  return {
    id,
    name: "New Entity",
    type: "basic",
    visible: true,
    castShadow: true,
    receiveShadow: true,
    geometry: "box",
    material: "phong",
    parent: null,
    children: [],
    components: {
      Transform: {
        position: { x: 0, y: 0.5, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    },
  }
}

export const generateNewLight = (): Engine.EntityProps => {
  const id = uuidv4()
  return {
    id,
    name: "New Light",
    type: "light",
    visible: true,
    castShadow: true,
    receiveShadow: true,
    parent: null,
    children: [],
    components: {
      Transform: {
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 0.5, y: 0.5, z: 0.5 },
      },
    },
    lightProps: {
      intensity: 0.7,
      type: "point",
      color: "rgb(255,255,0)",
    },
  }
}