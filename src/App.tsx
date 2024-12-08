import React from 'react';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Game />
    </div>
  );
};

export default App;
