import * as THREE from 'three';
import { generateNewMaterial } from '../../utils/script.utils';

export default class MaterialManager {
  public static instance: MaterialManager;

  constructor() {
    if (MaterialManager.instance) return;
    MaterialManager.instance = this;
  }

  getMaterial(type: Engine.MaterialType): THREE.Material {
    const coolMat = generateNewMaterial("coolMat");
    console.debug(type)
    switch (type) {
      case "normal":
        return new THREE.MeshNormalMaterial()
      case "basic":
        return new THREE.MeshBasicMaterial()
      case "phong":
        return new THREE.MeshPhongMaterial()
      case "lambert":
        return new THREE.MeshLambertMaterial()
      case "wireframe":
        return new THREE.MeshBasicMaterial({ wireframe: true })
      case "coolMat":
        console.debug('cool mat>');
        return new THREE.ShaderMaterial({
          uniforms: coolMat.uniforms,
          vertexShader: coolMat.vertexShader,
          fragmentShader: coolMat.fragmentShader,
        })
      default:
        return new THREE.MeshBasicMaterial()
    }
  }
}
