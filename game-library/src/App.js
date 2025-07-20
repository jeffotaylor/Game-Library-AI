import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameContainer from './components/GameContainer';
import GameMenu from './components/GameMenu';
import FlappyBirdGame from './games/FlappyBirdGame';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GameMenu />} />
          <Route path="/game/flappy-bird" element={<GameContainer game={<FlappyBirdGame />} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
