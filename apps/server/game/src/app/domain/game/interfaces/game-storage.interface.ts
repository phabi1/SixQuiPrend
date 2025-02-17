export interface IGameStorage {
  load(id: string): Promise<string>;
  save(id: string, game: string): Promise<void>;
  delete(id: string): Promise<void>;
}
