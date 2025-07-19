import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlappyBird from './FlappyBird';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Game Library</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/flappy-bird">Flappy Bird</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<h2>Welcome to the Game Library!</h2>} />
            <Route path="/flappy-bird" element={<FlappyBird />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;