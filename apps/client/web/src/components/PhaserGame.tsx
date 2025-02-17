import {
  setup as setupGame,
  load as loadGame,
} from '@six-qui-prend/libs-client-game';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Phaser from 'phaser';
import { socket } from '../socket';

export type PhaserGameProps = {
  gameId: string;
};

export type PhaserGameRef = HTMLElement;

export const PhaserGame = forwardRef<PhaserGameRef, PhaserGameProps>(
  (props, ref) => {
    const game = useRef<Phaser.Game>();
    useLayoutEffect(() => {
      if (game.current === undefined) {
        game.current = setupGame('game-container', {
          socket,
        });
      }
      return () => {
        if (game.current) {
          game.current.destroy(true);
          game.current = undefined;
        }
      };
    }, [ref]);
    useEffect(() => {
      if (game.current) {
        loadGame(game.current, props.gameId);
      }
    }, [props.gameId]);
    return <div id="game-container" />;
  }
);
