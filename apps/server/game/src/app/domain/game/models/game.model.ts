import { Serializable } from '../interfaces/serializable.interface';
import { Board } from './board.model';
import { Card } from './card.model';
import { Handle } from './handle.model';
import { Players } from './players.model';

export class Game implements Serializable {
  id: string = '';
  players: Players = new Players();
  handles: Handle[] = [];
  board: Board = new Board();
  status: 'waiting' | 'playing' = 'waiting';

  getId() {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }

  getStatus() {
    throw new Error('Method not implemented.');
  }

  getPlayers() {
    return this.players;
  }

  getHandleByPlayerId(playerId: string) {
    return this.handles.find(
      (handle) => handle.getPlayer()?.getId() === playerId
    );
  }

  start() {
    this.status = 'playing';

    this.players.resetPointsAllPlayers();

    const cards = this.generateCards();

    // Shuffle cards
    const cardsShuffled = this.shuffle(cards);

    this.handles = [];
    this.players.forEach((player) => {
      const handle = new Handle();
      handle.setPlayer(player);
      this.handles.push(handle);
    });

    // Distribute cards
    let i = 0;
    cardsShuffled.forEach((card) => {
      this.handles[i].addCard(card);
      i = (i + 1) % this.players.count();
    });

    // Distribute cards to board
    this.board = new Board();
    this.board.addCard(0, cardsShuffled.shift() as Card);
    this.board.addCard(1, cardsShuffled.shift() as Card);
    this.board.addCard(2, cardsShuffled.shift() as Card);
    this.board.addCard(3, cardsShuffled.shift() as Card);
  }

  private shuffle(cards: Card[]) {
    return cards.sort(() => Math.random() - 0.5);
  }

  private generateCards() {
    const cards = [];
    for (let i = 0; i < 115; i++) {
      cards.push(new Card(i + 1, i));
    }
    return cards;
  }

  serialize() {
    return {
      id: this.id,
      status: this.status,
      players: this.players.serialize(),
      handles: this.handles.map((handle) => handle.serialize()),
      board: this.board.serialize(),
    };
  }

  unserialize(data: any): void {
    this.id = data.id;
    this.status = data.status;
    this.players.unserialize(data.players);
    this.handles = data.handles.map((handleData: any) => {
      handleData.player = this.players.findPlayerById(handleData.playerId);
      const handle = new Handle();
      handle.unserialize(handleData);
      return handle;
    });
    this.board.unserialize(data.board);
  }
}
