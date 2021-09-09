import * as THREE from "three"
import SceneManager from "./SceneManager"

export default class MaterialManager {
  public static instance: MaterialManager
  materials: Record<Engine.MaterialType, THREE.Material> = {
    normal: new THREE.MeshNormalMaterial(),
    basic: new THREE.MeshBasicMaterial(),
    phong: new THREE.MeshPhongMaterial(),
    lambert: new THREE.MeshLambertMaterial(),
    wireframe: new THREE.MeshBasicMaterial({ wireframe: true }),
  }

  constructor() {
    if (MaterialManager.instance) return
    MaterialManager.instance = this
  }

  getMaterial(type: Engine.MaterialType): THREE.Material {
    return this.materials[type] ?? this.materials.basic
  }

  addCustomMaterial(materialPayload: Engine.Material): void {
    // true when an existing custom material is edited, and must refresh materials for each entity that uses it
    let mustRefreshEntities = false

    const mat = materialPayload.material
    const matchingMaterial = Object.values(this.materials).find(
      (m) => m.uuid === materialPayload.id
    )

    if (matchingMaterial) {
      matchingMaterial.dispose()
      mustRefreshEntities = true;
    }

    const newMaterial = new THREE.ShaderMaterial({
      uniforms: { ...mat.uniforms, time: { value: 0.0 } },
      vertexShader: materialPayload.vertexShader,
      fragmentShader: materialPayload.fragmentShader,
    })

    newMaterial.uuid = materialPayload.id
    this.materials[mat.name] = newMaterial

    if (mustRefreshEntities) {
      SceneManager.instance.refreshEntitiesMaterial(newMaterial)
    }
  }
}
