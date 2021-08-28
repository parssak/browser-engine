import * as THREE from "three"
import { generateNewMaterial } from "../../utils/script.utils"

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

  addCustomMaterial(materialPayload: Engine.MaterialPayload): void {
    const mat = materialPayload.material;
    this.materials[mat.name] = new THREE.ShaderMaterial({
      uniforms: mat.uniforms,
      vertexShader: materialPayload.vertexShader,
      fragmentShader: materialPayload.fragmentShader,
    })
  }
}
