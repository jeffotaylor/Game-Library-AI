
import React, { useState, useEffect, useCallback } from 'react';
import './Game.css';

const BIRD_SIZE = 20;
const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
const GRAVITY = 6;
const JUMP_HEIGHT = 100;
const PIPE_WIDTH = 60;
const PIPE_GAP = 200;
const BIRD_LEFT = 100;

const Game = () => {
  const [birdPosition, setBirdPosition] = useState(250);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [pipeHeight, setPipeHeight] = useState(200);
  const [pipeLeft, setPipeLeft] = useState(GAME_WIDTH - PIPE_WIDTH);
  const [score, setScore] = useState(0);

  const bottomPipeHeight = GAME_HEIGHT - PIPE_GAP - pipeHeight;

  useEffect(() => {
    let timeId;
    if (gameHasStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE) {
      timeId = setInterval(() => {
        setBirdPosition(birdPosition => birdPosition + GRAVITY);
      }, 24);
    }

    return () => {
      clearInterval(timeId);
    };
  }, [birdPosition, gameHasStarted]);

  useEffect(() => {
    let pipeId;
    if (gameHasStarted && pipeLeft >= -PIPE_WIDTH) {
      pipeId = setInterval(() => {
        setPipeLeft(pipeLeft => pipeLeft - 5);
      }, 24);

      return () => {
        clearInterval(pipeId);
      };
    } else {
      setPipeLeft(GAME_WIDTH - PIPE_WIDTH);
      setPipeHeight(Math.floor(Math.random() * (GAME_HEIGHT - PIPE_GAP)));
      if (gameHasStarted) {
        setScore(score => score + 1);
      }
    }
  }, [gameHasStarted, pipeLeft]);

  useEffect(() => {
    const hasCollidedWithTopPipe = birdPosition >= 0 && birdPosition < pipeHeight;
    const hasCollidedWithBottomPipe = birdPosition <= 500 && birdPosition >= 500 - bottomPipeHeight;

    if (
      pipeLeft >= 0 &&
      pipeLeft <= PIPE_WIDTH &&
      (hasCollidedWithTopPipe || hasCollidedWithBottomPipe)
    ) {
      setGameHasStarted(false);
    }
  }, [birdPosition, pipeHeight, pipeLeft, bottomPipeHeight]);

  const handleClick = useCallback(() => {
    if (!gameHasStarted) {
      setGameHasStarted(true);
      setScore(0);
      setBirdPosition(250);
    }
    setBirdPosition(bp => {
        let newBirdPosition = bp - JUMP_HEIGHT;
        if (newBirdPosition < 0) {
          newBirdPosition = 0;
        }
        return newBirdPosition;
    });
  }, [gameHasStarted]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClick]);

  return (
    <div className="game-container" onClick={handleClick}>
      <div className="game" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
        <div className="pipe" style={{ width: PIPE_WIDTH, left: pipeLeft, height: pipeHeight, top: 0 }} />
        <div className="pipe" style={{ width: PIPE_WIDTH, left: pipeLeft, height: bottomPipeHeight, top: GAME_HEIGHT - bottomPipeHeight }} />
        <div className="bird" style={{ height: BIRD_SIZE, width: BIRD_SIZE, top: birdPosition, left: BIRD_LEFT }} />
        <div className="score">Score: {score}</div>
      </div>
    </div>
  );
};

export default Game;
