import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketsModule } from './infra/websockets/websockets.module';
import { GameModule } from './domain/game/game.module';

@Module({
  imports: [WebsocketsModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
