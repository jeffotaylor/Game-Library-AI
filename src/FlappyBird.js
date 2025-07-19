import React, { useState, useEffect } from 'react';
import './styles.css';

const FlappyBird = () => {
  const [birdPosition, setBirdPosition] = useState(200);
  const [gameOver, setGameOver] = useState(false);
  const [pipes, setPipes] = useState([{ x: 500, height: Math.random() * 150 + 50 }]);
  const gravity = 3;
  const jumpStrength = -70;

  useEffect(() => {
    let gameInterval;
    if (!gameOver) {
      gameInterval = setInterval(() => {
        setBirdPosition((prevPos) => prevPos + gravity);

        // Move pipes
        setPipes((prevPipes) =>
          prevPipes.map((pipe) => ({ ...pipe, x: pipe.x - 5 }))
        );

        // Add new pipes
        if (pipes[pipes.length - 1].x < 300) {
          setPipes((prevPipes) => [
            ...prevPipes,
            { x: 600, height: Math.random() * 150 + 50 },
          ]);
        }

        // Remove pipes that are off-screen
        setPipes((prevPipes) =>
          prevPipes.filter((pipe) => pipe.x > -50)
        );

        // Check for collisions
        const birdRect = {
          x: 50,
          y: birdPosition,
          width: 34,
          height: 24,
        };

        pipes.forEach((pipe) => {
          const topPipeRect = { x: pipe.x, y: 0, width: 76, height: pipe.height };
          const bottomPipeRect = {
            x: pipe.x,
            y: pipe.height + 150,
            width: 76,
            height: 400 - (pipe.height + 150),
          };

          if (
            (birdRect.x < topPipeRect.x + topPipeRect.width &&
              birdRect.x + birdRect.width > topPipeRect.x &&
              birdRect.y < topPipeRect.y + topPipeRect.height) ||
            (birdRect.x < bottomPipeRect.x + bottomPipeRect.width &&
              birdRect.x + birdRect.width > bottomPipeRect.x &&
              birdRect.y + birdRect.height > bottomPipeRect.y)
          ) {
            setGameOver(true);
          }
        });

        // Check if bird hits the ground
        if (birdPosition > 400) {
          setGameOver(true);
        }
      }, 20);

      return () => clearInterval(gameInterval);
    }
  }, [gameOver, pipes, birdPosition]);

  const handleJump = () => {
    if (!gameOver) {
      setBirdPosition((prevPos) => prevPos + jumpStrength);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        handleJump();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleJump]);

  return (
    <div className="game-container">
      {gameOver ? (
        <h2>Game Over</h2>
      ) : (
        <>
          <div
            className="bird"
            style={{ top: `${birdPosition}px` }}
          ></div>
          {pipes.map((pipe, index) => (
            <React.Fragment key={index}>
              <div
                className="top-pipe"
                style={{
                  left: `${pipe.x}px`,
                  height: `${pipe.height}px`,
                }}
              ></div>
              <div
                className="bottom-pipe"
                style={{
                  left: `${pipe.x}px`,
                  top: `${pipe.height + 150}px`,
                }}
              ></div>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default FlappyBird;
