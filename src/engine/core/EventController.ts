export default class EventController {
  scene: any;
  constructor(scene: any) {
    this.scene = scene;
    this.SetupEvents();
  }

  SetupEvents() {
    // document.addEventListener('keydown', (e) => {
    //   if (e.keyCode !== 32) return;
    //   this.scene.running ? this.scene.Stop() : this.scene.Run();
    // });
  }
}