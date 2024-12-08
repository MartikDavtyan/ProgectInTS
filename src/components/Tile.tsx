import React from 'react';

interface TileProps {
  value: number;
}

const Tile: React.FC<TileProps> = ({ value }) => {
  const getColor = (value: number) => {
    const colors = {
      0: 'bg-gray-400',
      2: 'bg-yellow-100',
      4: 'bg-yellow-200',
      8: 'bg-yellow-300',
      16: 'bg-orange-300',
      32: 'bg-orange-400',
      64: 'bg-orange-500',
      128: 'bg-red-300',
      256: 'bg-red-400',
      512: 'bg-red-500',
      1024: 'bg-green-300',
      2048: 'bg-green-500',
    };
    return colors[value] || 'bg-gray-700';
  };

  return (
    <div
      className={`flex items-center justify-center w-20 h-20 text-xl font-bold text-gray-800 ${getColor(
        value
      )}`}
    >
      {value !== 0 ? value : ''}
    </div>
  );
};

export default Tile;
