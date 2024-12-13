import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import { initializeGrid, moveTiles, isGameOver } from '../utils/gameLogic';

const Game: React.FC = () => {
  const [grid, setGrid] = useState<number[]>(initializeGrid());
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (gameOver) return;

    let newGrid = [...grid];
    
    if (e.key === 'ArrowLeft' || e.key === 'A' || e.key === 'a') {newGrid = moveTiles(grid, 'left', setScore);}
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D'){ newGrid = moveTiles(grid, 'right', setScore);}
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {newGrid = moveTiles(grid, 'up', setScore);}
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {newGrid = moveTiles(grid, 'down', setScore);}

    setGrid(newGrid);

    if (isGameOver(newGrid)) setGameOver(true);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [grid, gameOver]);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">2048</h1>
      <p className="text-lg mb-4">Score: {score}</p>
      {gameOver && <div>
        <p className="text-red-500 font-bold">Game Over!</p>
        <button className='bg-slate-400 mb-4 rounded-[10px] p-2' onClick={()=>{
            setGrid(initializeGrid())
            setGameOver(false)
            setScore(0)
        }}>Restart</button>
        </div>}
        {grid.includes(2048) && <div>
        <p className="text-green-700 font-bold">You Wine!</p>
        <button className='bg-slate-400 mb-4 rounded-lg p-2' onClick={()=>{
            setGrid(initializeGrid())
            setGameOver(false)
            setScore(0)
        }}>Restart</button>
        </div>}
      <Grid grid={grid} />
    </div>
  );
};

export default Game;
