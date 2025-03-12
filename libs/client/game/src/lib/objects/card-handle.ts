export class CardHandle extends Phaser.GameObjects.Container {
  private cards: Phaser.GameObjects.Image[] = [];

  setCards(cards: string[]) {
    this.removeAll(true);
    this.cards = [];
    cards.forEach((card: string, index: number) => {
      const image = this.scene.add.image(index * 50, 0, card);
      this.add(image);
      this.cards.push(image);
    });
  }
}
