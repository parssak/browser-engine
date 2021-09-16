export const recursiveSetHelper = (object: THREE.Object3D, type: 'helper' | 'helper-block' = 'helper') => {
  if (!object) return;
  object.type = type
  object.children.forEach(child => recursiveSetHelper(child, type))
}

