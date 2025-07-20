import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FlappyBirdGame from '../games/FlappyBirdGame';

const GameContainer = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    // Load the requested game component
    if (gameId === 'flappy-bird') {
      setGame(<FlappyBirdGame />);
    }
  }, [gameId]);

  return (
    <div className="game-container">
      {game}
    </div>
  );
};

export default GameContainer;
  // Dynamic game loading system
  const [gameComponent, setGameComponent] = useState(null);
  
  useEffect(() => {
    // Load game component dynamically
    import(`../games/${selectedGame}`)
      .then(module => {
        setGameComponent(() => module.default);
      })
      .catch(error => {
        console.error(`Failed to load game ${selectedGame}:`, error);
      });
  }, [selectedGame]);
  // Dynamic game loading system
  const GameContainer = ({ selectedGame }) => {
    const [gameComponent, setGameComponent] = useState(null);
  
    useEffect(() => {
      // Load game component dynamically
      import(`../games/${selectedGame}`)
        .then(module => {
          setGameComponent(() => module.default);
        })
        .catch(error => {
          console.error(`Failed to load game ${selectedGame}:`, error);
        });
    }, [selectedGame]);
  
    return (
      <div className="game-container">
        {gameComponent ? <gameComponent /> : <div>Loading game...</div>}
      </div>
    );
  };
  // Dynamic game loading system
  const [gameComponent, setGameComponent] = useState(null);
  
  useEffect(() => {
    // Load game component dynamically
    import(`../games/${selectedGame}`)
      .then(module => {
        setGameComponent(() => module.default);
      })
      .catch(error => {
        console.error(`Failed to load game ${selectedGame}:`, error);
      });
  }, [selectedGame]);
  
  return (
    <div className="game-container">
      {gameComponent ? <gameComponent /> : <div>Loading game...</div>}
    </div>
  );