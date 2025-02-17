import { Serializable } from '../interfaces/serializable.interface';
import { Card } from './card.model';
import { Player } from './player.model';

export class Handle implements Serializable {
  private player?: Player;
  private cards: Card[] = [];

  getPlayer() {
    return this.player;
  }

  setPlayer(player: Player) {
    this.player = player;
  }

  getCards() {
    return this.cards;
  }

  setCards(cards: Card[]) {
    this.cards = cards;
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  serialize() {
    return {
      playerId: this.player?.getId(),
      cards: this.cards.map((card) => card.serialize()),
    };
  }

  unserialize(data: any): void {
    this.player = data.player;
    this.cards = data.map((cardData: any) => {
      const card = new Card();
      card.unserialize(cardData);
      return card;
    });
  }
}
