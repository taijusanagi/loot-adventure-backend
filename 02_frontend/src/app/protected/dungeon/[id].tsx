// pages/product/[id].tsx
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const productImages = ['/product1.jpg', '/product2.jpg', '/product3.jpg', '/product4.jpg', '/product5.jpg', '/product6.jpg'];

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return <div>Invalid product ID</div>;
  }

  const productId = parseInt(id, 10);
  const product = { id: productId, name: `Product ${productId}`, images: productImages };

  return (
    <Grid container spacing={2}>
      {product.images.map((image, index) => (
        <Grid key={index} item xs={6}>
          <Paper>
            <img src={image} alt={`Product ${productId}`} style={{ width: '100%' }} />
          </Paper>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant="h4">{product.name}</Typography>
      </Grid>
    </Grid>
  );
};
