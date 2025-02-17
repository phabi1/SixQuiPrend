import { Serializable } from '../interfaces/serializable.interface';
import { Card } from './card.model';

export class Board implements Serializable {
  private columns: Card[][] = [];

  constructor() {
    this.columns = [[], [], [], []];
  }

  addCard(index: number, card: Card) {
    const column = this.getColumn(index);
    column.push(card);
  }

  getColumn(index: number): Card[] {
    const total = this.columns.length;
    if (index > total) {
      throw new Error('Column must be between 0 and ' + total);
    }
    return this.columns[index];
  }

  getLastCard(index: number): Card {
    const column = this.getColumn(index);
    return column[column.length - 1];
  }

  serialize() {
    return this.columns.map((column) => column.map((card) => card.serialize()));
  }

  unserialize(data: any): void {
    this.columns = data.map((column: any) =>
      column.map((cardData: any) => {
        const card = new Card();
        card.unserialize(cardData);
        return card;
      })
    );
  }
}
