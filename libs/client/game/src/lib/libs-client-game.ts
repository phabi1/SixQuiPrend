import Phaser from 'phaser';
import GameScene from './scenes/game.scene.js';
import JoinScene from './scenes/join.scene.js';
import PreloaderScene from './scenes/preloader.scene.js';
import { container } from './services/container.js';

export function setup(parent: string, options: { socket: unknown }) {
  const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent,
    backgroundColor: '#028af8',
    scene: [PreloaderScene, JoinScene, GameScene],
  };

  container.set('socket', options.socket);

  const game = new Phaser.Game(config);
  return game;
}

export function load(game: Phaser.Game, gameId: string) {
  container.set('gameId', gameId);

  game.scene.start('preloader');
}
