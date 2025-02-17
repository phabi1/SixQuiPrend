import { Injectable } from '@nestjs/common';
import { IGameStorage } from '../interfaces/game-storage.interface';
import { mkdir, readFile, unlink, writeFile } from 'fs/promises';

@Injectable()
export class FilesystemStorage implements IGameStorage {
  directory: string = 'data/games';

  async load(id: string): Promise<string> {
    try {
      const content = readFile(this.directory + '/' + id + '.json', 'utf-8');
      return content;
    } catch (error) {
      throw new Error('Game not found');
    }
  }

  async save(id: string, game: string): Promise<void> {
    await this.prepareDirectory();
    try {
      await writeFile(this.directory + '/' + id + '.json', game);
    } catch (error) {
      throw new Error('Error saving game');
    }
  }

  async delete(id: string): Promise<void> {
    await unlink(this.directory + '/' + id + '.json');
  }

  private async prepareDirectory() {
    try {
      await mkdir(this.directory, { recursive: true });
    } catch (error) {
      throw new Error('Error creating directory');
    }
  }
}
