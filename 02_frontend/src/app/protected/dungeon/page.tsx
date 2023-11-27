// pages/index.tsx
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import Link from 'next/link';

const products = [
  { id: 1, name: 'Product 1', image: '/product1.jpg' },
  { id: 2, name: 'Product 2', image: '/product2.jpg' },
  // Add more products as needed
];

export default function Home() {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id} item xs={6} sm={3}>
          <Link href={`/protected/dungeon/${product.id}`}>
            <Paper>
              <img src={product.image} alt={product.name} style={{ width: '100%' }} />
              <Typography variant="caption">{product.name}</Typography>
            </Paper>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
