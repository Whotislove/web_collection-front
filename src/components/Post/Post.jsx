import { Card, CardActionArea, CardMedia, Typography } from '@mui/material';
import React from 'react';
import styles from './Post.module.scss';
const Post = ({ title, type, image }) => {
  return (
    <div className={styles.root}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ height: 200 }}
            // image={`${process.env.REACT_APP_API_URL}${image}`}
            image={`http://localhost:1111${image}`}
            alt="hryak"
          />
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {type}
          </Typography>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Post;
