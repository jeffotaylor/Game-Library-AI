import React from 'react';
import { Link } from 'react-router-dom';

const GameMenu = () => {
  return (
    <div className="game-menu">
      <h1>Game Library</h1>
      <div className="game-list">
        <div className="game-item">
          <Link to="/game/flappy-bird" className="game-button">
            Play Flappy Bird
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;