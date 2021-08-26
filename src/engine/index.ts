import * as THREE from "three";

class BrowserEngine {
  Vector2(x: number, y: number): THREE.Vector2 {
    return new THREE.Vector2(x, y);
  }

  Vector3(x: number, y: number, z: number): THREE.Vector3 {
    console.log('called');
    return new THREE.Vector3(x, y, z);
  }
}

export default BrowserEngine;