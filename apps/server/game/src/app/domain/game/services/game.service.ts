import { Inject, Injectable } from '@nestjs/common';
import { Game } from '../models/game.model';
import { GAME_STORAGE } from '../constants/tokens';
import { IGameStorage } from '../interfaces/game-storage.interface';

@Injectable()
export class GameService {
  private games: Map<string, Game> = new Map();

  constructor(@Inject(GAME_STORAGE) private readonly storage: IGameStorage) {}

  async findOne(gameId: string): Promise<Game> {
    if (!this.games.has(gameId)) {
      const game = await this.loadFromStorage(gameId);
      if (!game) {
        throw new Error('Game not found');
      }
      this.games.set(gameId, game);
    }
    return this.games.get(gameId) as Game;
  }

  async create(game: Game): Promise<void> {
    if (game.getId() === '') {
      game.setId(Math.random().toString(36).substr(2, 9));
    }
    this.games.set(game.id, game);
    await this.saveToStorage(game.id, game);
  }

  async save(game: Game): Promise<void> {
    this.games.set(game.id, game);
    await this.saveToStorage(game.id, game);
  }

  async delete(gameId: string): Promise<void> {
    this.games.delete(gameId);
    await this.storage.delete(gameId);
  }

  private async loadFromStorage(id: string): Promise<Game> {
    const content = await this.storage.load(id);
    const state = JSON.parse(content);
    const game = new Game();
    game.unserialize(state);
    return game;
  }

  private async saveToStorage(id: string, game: any): Promise<void> {
    const state = game.serialize();
    const content = JSON.stringify(state);
    await this.storage.save(id, content);
  }
}
