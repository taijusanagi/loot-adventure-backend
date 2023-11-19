// pages/top.tsx
import { Grid, Paper } from '@mui/material';
import { useState } from 'react';

const TopPage = () => {
  const [tiles, setTiles] = useState<Array<boolean>>(new Array(16).fill(false));

  const handleTileClick = (index: number) => {
    const newTiles = [...tiles];
    newTiles[index] = !newTiles[index];
    setTiles(newTiles);
  };

  return (
    <div>
      <h1>Top Page</h1>
      <Grid container spacing={2}>
        {tiles.map((tile, index) => (
          <Grid item xs={3} key={index}>
            <Paper
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: tile ? 'blue' : 'grey',
                cursor: 'pointer',
              }}
              onClick={() => handleTileClick(index)}
            >
              {/* タイルの中身 */}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TopPage;
