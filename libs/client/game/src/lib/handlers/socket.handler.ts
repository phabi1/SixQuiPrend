import { Socket } from 'socket.io-client';
import GameScene from '../scenes/game.scene.js';

export class SocketHandler {
  private socket: Socket;
  private scene: GameScene;
  private gameId: string;

  constructor(gameId: string, scene: GameScene, socket: Socket) {
    this.gameId = gameId;
    this.scene = scene;
    this.socket = socket;
  }

  bindEvents() {
    this.socket.on('player-joined', this.onPlayerJoined.bind(this));
    this.socket.on('game', this.onGame.bind(this));
  }

  unbindEvents() {
    this.socket.off('player-joined', this.onPlayerJoined.bind(this));
    this.socket.off('game', this.onGame.bind(this));
  }

  onPlayerJoined(player: any) {
    this.scene.table.addPlayer(player);
  }

  onGame(game: any) {
    this.scene.table.setPlayers(game.players);
    this.scene.cardHandle.setCards(game.handle.cards);
  }

  emit(event: string, data: any) {
    this.socket.emit(event, {
      gameId: this.gameId,
      ...data,
    });
  }
}
