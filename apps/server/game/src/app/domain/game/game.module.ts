import { Module } from '@nestjs/common';
import { GAME_STORAGE } from './constants/tokens';
import { GameService } from './services/game.service';
import { FilesystemStorage } from './storages/filesystem.storage';

@Module({
  providers: [
    GameService,
    {
      provide: GAME_STORAGE,
      useClass: FilesystemStorage,
    },
  ],
  exports: [GameService],
})
export class GameModule {}
