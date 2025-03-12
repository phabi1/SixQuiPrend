import { Socket } from 'socket.io-client';
import { SocketHandler } from '../handlers/socket.handler.js';
import { CardHandle } from '../objects/card-handle.js';
import { Table } from '../objects/table.js';
import { container } from '../services/container.js';

export default class GameScene extends Phaser.Scene {
  private playerId!: string;
  private socketHander!: SocketHandler;

  public table!: Table;
  public cardHandle!: CardHandle;

  constructor() {
    super('game');
  }

  create() {
    const gameId = container.get('gameId') as string;
    this.socketHander = new SocketHandler(
      gameId,
      this,
      container.get('socket') as Socket
    );

    this.socketHander.bindEvents();

    this.table = new Table(this, 0, 0);
    this.cardHandle = new CardHandle(this, 0, 0);

    this.socketHander.emit('game', { playerId: this.playerId });

  }

  init(data: { playerId: string }) {
    this.playerId = data.playerId;
  }

  destroy() {
    this.socketHander.unbindEvents();
  }
}
