import { Card, Typography, CardContent } from '@mui/material';
import React from 'react';
import styles from './ItemPost.module.scss';
const ItemPost = ({ fullName, itemName, collectionName }) => {
  return (
    <div className={styles.root}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {fullName}
          </Typography>
          <Typography variant="h5" component="div">
            {itemName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {collectionName}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemPost;
