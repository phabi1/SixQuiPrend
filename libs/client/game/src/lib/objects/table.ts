import { Player } from './player.js';

export class Table extends Phaser.GameObjects.Container {
  private players: Player[] = [];

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, []);
    this.scene.add.existing(this);
  }

  setPlayers(players: any) {
    this.removeAll(true);
    this.players = [];
    players.forEach((playerInfo: any) => {
      const player = new Player(this.scene, playerInfo.name);
      player.setPoints(playerInfo.points);
      this.add(player);
      this.players.push(player);
    });
    this.rearrange();
  }

  addPlayer(info: any) {
    const player = new Player(this.scene, info);
    this.add(player);
    this.rearrange();
  }

  rearrange() {
    const windowScreenWidth = this.scene.game.config.width as number;
    const count = this.players.length;
    const width = windowScreenWidth / count;
    this.players.forEach((player, index) => {
      player.setPosition(index * width, 0);
    });
  }
}
