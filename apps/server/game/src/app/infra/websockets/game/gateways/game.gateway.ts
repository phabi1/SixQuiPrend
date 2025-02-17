import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Game } from '../../../../domain/game/models/game.model';
import { Player } from '../../../../domain/game/models/player.model';
import { GameService } from '../../../../domain/game/services/game.service';

@WebSocketGateway({ namespace: 'game', cors: true })
export class GameGateway {
  constructor(private readonly gameService: GameService) {}

  @SubscribeMessage('create')
  async handleCreate(@MessageBody() body: {}): Promise<WsResponse> {
    const game = new Game();
    await this.gameService.create(game);
    return {
      event: 'create',
      data: {
        gameId: game.getId(),
      },
    };
  }

  @SubscribeMessage('game')
  async handleGame(
    @MessageBody() body: { gameId: string; playerId: string }
  ): Promise<WsResponse> {
    const game = await this.gameService.findOne(body.gameId);
    if (!game) {
      return this.createGameNotFoundResponse();
    }

    const handle = game.getHandleByPlayerId(body.playerId);

    return {
      event: 'game',
      data: {
        gameId: game.getId(),
        status: game.getStatus(),
        players: game.getPlayers().serialize(),
        handle: handle?.serialize(),
      },
    };
  }

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() body: { gameId: string; name: string },
    @ConnectedSocket() client: Socket
  ): Promise<WsResponse> {
    const game = await this.gameService.findOne(body.gameId);
    if (!game) {
      return this.createGameNotFoundResponse();
    }

    const player = new Player();
    player.setName(body.name);
    game.players.addPlayer(player);

    client.join(game.getId());

    client.to(game.getId()).emit('player-joined', player.serialize());

    return {
      event: 'join',
      data: game,
    };
  }

  @SubscribeMessage('leave')
  async handleLeave(
    @MessageBody() body: { gameId: string }
  ): Promise<WsResponse> {
    return {
      event: 'leave',
      data: { gameId: body.gameId },
    };
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  private createGameNotFoundResponse() {
    return {
      event: 'game',
      data: { error: 'Game not found' },
    };
  }
}
