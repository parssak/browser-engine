export default class ComponentManager {
  public static instance: ComponentManager;

  constructor() {
    if (ComponentManager.instance) return;
    ComponentManager.instance = this;
  }
}