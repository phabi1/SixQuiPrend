import { Serializable } from '../interfaces/serializable.interface';
import { Player } from './player.model';

export class Players implements Serializable {
  private players: Player[] = [];

  addPlayer(player: Player) {
    this.players.push(player);
  }

  removePlayer(player: Player) {
    this.players = this.players.filter((p) => p.getId() !== player.getId());
  }

  findPlayerById(playerId: string) {
    return this.players.find((player) => player.getId() === playerId);
  }

  forEach(callback: (player: Player) => void) {
    this.players.forEach(callback);
  }

  count() {
    return this.players.length;
  }

  resetPointsAllPlayers() {
    this.players.forEach((player) => player.setPoints(0));
  }

  serialize() {
    return this.players.map((player) => player.serialize());
  }

  unserialize(data: any): void {
    this.players = data.map((playerData: any) => {
      const player = new Player();
      player.unserialize(playerData);
      return player;
    });
  }
}
