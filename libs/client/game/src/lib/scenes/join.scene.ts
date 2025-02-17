import { container } from '../services/container.js';
import { Socket } from 'socket.io-client';

export default class JoinScene extends Phaser.Scene {
  private socket: Socket;

  constructor() {
    super('join');
    this.socket = container.get('socket') as Socket;
  }

  create() {
    const gameId = container.get('gameId');
    const playerId = localStorage.getItem('game:' + gameId + 'player');
    if (playerId) {
      this.redirectToGame(playerId);
    }

    this.socket.on('join', this.onJoined);

    this.socket.emit('join', { gameId }, (playerId: string) => {});
  }

  destroy() {
    this.socket.off('join', this.onJoined);
  }

  redirectToGame(playerId: string) {
    this.scene.start('game', { playerId });
  }

  onJoined(playerId: string) {
    localStorage.setItem('playerId', playerId);
    this.redirectToGame(playerId);
  }
}
