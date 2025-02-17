import { useParams } from 'react-router-dom';
import { PhaserGame } from '../../components/PhaserGame';

export default function GamePlay() {
  const { gameId } = useParams();
  if (gameId === undefined) {
    return null;
  }
  return <PhaserGame gameId={gameId} />;
}
