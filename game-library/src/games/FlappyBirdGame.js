import React, { useState, useEffect } from 'react';

const FlappyBirdGame = () => {
  // Game state
  const [birdY, setBirdY] = useState(200);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(2); // Speed multiplier

  // Game constants
  const GRAVITY = 0.5;
  const JUMP_FORCE = -8;
  const PIPE_WIDTH = 50;
  const PIPE_GAP = 150;
  const BIRD_SIZE = 30;
  const GAME_HEIGHT = 500;

  const gameStart = () => {
    setGameStarted(true);
    setGameSpeed(2);
  }

  const handleJump = () => {
    if (!gameStarted){
      gameStart();
    }
    else {
      setBirdY(prevY => prevY + JUMP_FORCE);
    }
  }

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    // Check for collisions
    console.log('Collision Check - Bird Y:', birdY, 'Pipes:', pipes);
    const checkCollisions = () => {
      if (birdY < 0 || birdY + BIRD_SIZE > GAME_HEIGHT) {
        setGameOver(true);
        return;
      }

      setPipes(prevPipes => {
        return prevPipes.filter(pipe => {
          if (pipe.x + PIPE_WIDTH < 50) return true; // Pipe not in collision range

          // Check if bird is in collision range
          if (pipe.x < 50 + BIRD_SIZE) {
            // Check collision with top pipe
            if (birdY < pipe.top) {
              setGameOver(true);
              return false;
            }
            
            // Check collision with bottom pipe
            if (birdY + BIRD_SIZE > pipe.bottom) {
              setGameOver(true);
              return false;
            }
            
            // Check if bird passed the pipe
            if (pipe.x < 50 - PIPE_WIDTH) {
              setScore(prevScore => prevScore + 1);
            }
          }
          
          return true;
        });
      });
    };

  // Increase game speed over time
  setGameSpeed(prevSpeed => prevSpeed + 0.001);
    const gameLoop = setInterval(() => {
      // Update bird position
      setBirdY(prevY => prevY + GRAVITY * gameSpeed);

      // Update pipes
      setPipes(prevPipes => {
        // Move existing pipes
        const movedPipes = prevPipes.map(pipe => ({
          ...pipe,
          x: pipe.x - 2 * gameSpeed
        }));

        // Remove pipes that have moved off screen
        const filteredPipes = movedPipes.filter(pipe => pipe.x + PIPE_WIDTH > 0);

        // Add new pipe if needed
        if (filteredPipes.length === 0 || filteredPipes[filteredPipes.length - 1].x < 200) {
          const newPipeY = Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50;
          return [...filteredPipes, {
            x: 300,
            top: newPipeY,
            bottom: newPipeY + PIPE_GAP
          }];
        }

        return filteredPipes;
      });

      // Check for collisions
      checkCollisions();
    }, 16); // ~60fps

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, gameSpeed, birdY, pipes]);

  return (
    <div className="flappy-bird-game">
      <div className="score">Score: {score}</div>
      
      {gameOver ? (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Your score: {score}</p>
          <button onClick={handleJump}>Play Again</button>
        </div>
      ) : (
        <button onClick={handleJump}>
          {gameStarted ? 'Jump' : 'Start Game'}
        </button>
      )}
      
      <div className="bird" style={{ top: birdY }}></div>
      
      {pipes.map((pipe, index) => (
        <div key={index} className="pipe">
          <div 
            className="pipe-top" 
            style={{ 
              height: pipe.top, 
              width: PIPE_WIDTH 
            }}
          ></div>
          <div 
            className="pipe-bottom" 
            style={{ 
              height: GAME_HEIGHT - pipe.bottom, 
              width: PIPE_WIDTH, 
              top: pipe.bottom 
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default FlappyBirdGame;