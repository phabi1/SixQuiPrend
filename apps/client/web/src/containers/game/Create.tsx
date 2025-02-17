import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket';

export default function Create() {
  useEffect(() => {
    const onGameCreated = (data: { gameId: string }) => {
      console.log('game created', data);
      navigate(`/game/${data.gameId}`);
    };

    socket.on('create', onGameCreated);

    return () => {
      socket.off('create', onGameCreated);
    };
  }, []);

  const navigate = useNavigate();
  const createGame = () => {
    socket.emit('create', {});
  };

  return (
    <div>
      <h1>Create</h1>
      <button onClick={() => createGame()}>Create</button>
    </div>
  );
}
