import React, { useState } from 'react';
import './App.css';
import Game from './components/Game/Game';

function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    { name: 'Flappy Bird', component: <Game /> }
    // Add other games here
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Game Library</h1>
      </header>
      <main>
        {selectedGame ? (
          selectedGame.component
        ) : (
          <div className="game-menu">
            <h2>Select a Game</h2>
            <ul>
              {games.map(game => (
                <li key={game.name} onClick={() => setSelectedGame(game)}>
                  {game.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;