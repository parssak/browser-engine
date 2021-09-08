export const recursiveSetHelper = (object: THREE.Object3D) => {
  if (!object) return;
  object.type = "helper"
  object.children.forEach(recursiveSetHelper)
}
