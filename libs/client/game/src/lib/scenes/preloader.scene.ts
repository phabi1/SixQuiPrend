export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preloader' });
  }

  preload() {
    this.load.image('logo', 'images/logo.jpg');
  }

  create() {
    this.add.image(400, 300, 'logo');
    this.scene.start('join');
  }
}
