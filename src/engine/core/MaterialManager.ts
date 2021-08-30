import * as THREE from "three"

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
    const mat = materialPayload.material
    this.materials[mat.name] = new THREE.ShaderMaterial({
      uniforms: { ...mat.uniforms, time: { value: 0.0 } },
      vertexShader: materialPayload.vertexShader,
      fragmentShader: materialPayload.fragmentShader,
    })
  }
}
