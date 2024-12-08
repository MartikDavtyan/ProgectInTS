export const initializeGrid = (): number[] => {
    const grid = Array(16).fill(0);
    addRandomTile(grid);
    addRandomTile(grid);
    return grid;
  };
  
  export const addRandomTile = (grid: number[]): void => {
    const emptyIndices = grid.reduce<number[]>(
      (acc, val, idx) => (val === 0 ? [...acc, idx] : acc),
      []
    );
  
    if (emptyIndices.length > 0) {
      const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      grid[randomIndex] = Math.random() < 0.9 ? 2 : 4;
    }
  };
  
  export const moveTiles = (
    grid: number[],
    direction: 'left' | 'right' | 'up' | 'down',
    setScore: (score: number) => void
  ): number[] => {
    const size = 4;
    let newGrid = [...grid];
    let scoreIncrement = 0;
  
    const slideAndMerge = (row: number[]): number[] => {
      const filteredRow = row.filter((val) => val !== 0); 
      for (let i = 0; i < filteredRow.length - 1; i++) {
        if (filteredRow[i] === filteredRow[i + 1]) {
          filteredRow[i] *= 2;
          scoreIncrement += filteredRow[i];
          filteredRow[i + 1] = 0;
        }
      }
      const result = filteredRow.filter((val) => val !== 0); 
      return [...result, ...Array(size - result.length).fill(0)]; 
    };
  
    const getRows = () => {
      if (direction === 'left' || direction === 'right') {
        return Array.from({ length: size }, (_, i) =>
          newGrid.slice(i * size, i * size + size)
        );
      }
      if (direction === 'up' || direction === 'down') {
        return Array.from({ length: size }, (_, i) =>
          Array.from({ length: size }, (_, j) => newGrid[j * size + i])
        );
      }
      return [];
    };
  
    const setRows = (rows: number[][]) => {
      if (direction === 'left' || direction === 'right') {
        rows.forEach((row, i) =>
          row.forEach((val, j) => (newGrid[i * size + j] = val))
        );
      }
      if (direction === 'up' || direction === 'down') {
        rows.forEach((col, i) =>
          col.forEach((val, j) => (newGrid[j * size + i] = val))
        );
      }
    };
  
    let rows = getRows();
    rows = rows.map((row) =>
      direction === 'right' || direction === 'down'
        ? slideAndMerge(row.reverse()).reverse()
        : slideAndMerge(row)
    );
    setRows(rows);
  
    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      addRandomTile(newGrid);
      setScore((prev) => prev + scoreIncrement);
    }
  
    return newGrid;
  };
  
  export const isGameOver = (grid: number[]): boolean => {
    const size = 4; 
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === 0) return false; 
      const row = Math.floor(i / size);
      const col = i % size;
      if (
        (col < size - 1 && grid[i] === grid[i + 1]) || 
        (row < size - 1 && grid[i] === grid[i + size]) 
      ) {
        return false;
      }
    }
    return true;
  };
  