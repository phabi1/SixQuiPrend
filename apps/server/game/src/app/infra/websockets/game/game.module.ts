import { forwardRef, Module } from '@nestjs/common';
import { GameModule } from '../../../domain/game/game.module';
import { GameGateway } from './gateways/game.gateway';

@Module({
  imports: [forwardRef(() => GameModule)],
  providers: [GameGateway],
})
export class GameWebsocketsModule {}
