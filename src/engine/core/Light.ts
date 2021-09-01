import * as THREE from "three"
export default class Light {
  id: Engine.LightID
  _light!: THREE.Light

  constructor(props: Engine.LightProps) {
    this.id = props.id
    this.init(props)
  }

  init(props: Engine.LightProps) {
    if (!this._light || props.type !== this._light.type) {
      this._light = this.CreateLight(props)
    }
    this._light.uuid = props.id;
    const light = this._light as any
    if (light.setPosition) {
      light.setPosition(props.position)
    }
  }

  private CreateLight(props: Engine.LightProps): THREE.Light {
    switch (props.type) {
      case "ambient":
        return new THREE.AmbientLight(props.color, props.intensity)
      case "directional":
        return new THREE.DirectionalLight(props.color, props.intensity)
      case "hemisphere":
        return new THREE.HemisphereLight(props.color, props.color2, props.intensity)
      case "point":
        return new THREE.PointLight(props.color, props.intensity)
      default:
        return new THREE.AmbientLight(props.color, props.intensity)
    }
  }
}
