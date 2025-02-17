// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GamePlay from './game/Play';
import Home from './Home';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<GamePlay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
