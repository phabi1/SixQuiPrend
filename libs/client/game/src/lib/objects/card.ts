export class Card extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, card: string) {
    super(scene, 0, 0, card);
    scene.add.existing(this);
  }
}
