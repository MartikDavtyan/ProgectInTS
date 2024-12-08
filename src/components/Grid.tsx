import React from 'react';
import Tile from './Tile';

interface GridProps {
  grid: number[];
}

const Grid: React.FC<GridProps> = ({ grid }) => {
  return (
    <div className="grid grid-cols-4 gap-4 bg-gray-300 p-4 rounded-lg">
      {grid.map((value, index) => (
        <Tile key={index} value={value} />
      ))}
    </div>
  );
};

export default Grid;
