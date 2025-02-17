export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preloader' });
  }

  preload() {
    this.load.image('logo', 'assets/logo.png');
  }

  create() {
    this.add.image(400, 300, 'logo');
  }
}
