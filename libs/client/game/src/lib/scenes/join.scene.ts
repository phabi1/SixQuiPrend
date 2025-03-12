import { container } from '../services/container.js';
import { Socket } from 'socket.io-client';

export default class JoinScene extends Phaser.Scene {
  private socket: Socket;

  constructor() {
    super('join');
    this.socket = container.get('socket') as Socket;
  }

  create() {
    this.add.text(400, 300, 'Join Scene', { fontSize: '32px', color: '#fff' });

    const gameId = container.get('gameId');
    const playerId = localStorage.getItem('game:' + gameId + ':player');
    if (playerId) {
      this.redirectToGame(playerId);
    } else {
      const onJoined = (data: { playerId: string }) => {
        this.socket.off('join', onJoined);
        localStorage.setItem('game:' + gameId + ':player', data.playerId);
        this.redirectToGame(data.playerId);
        
      };

      this.socket.on('join', onJoined);

      this.socket.emit('join', { gameId });
    }
  }

  redirectToGame(playerId: string) {
    this.scene.start('game', { playerId });
  }
}
