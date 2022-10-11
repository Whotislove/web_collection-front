import { Typography } from '@mui/material';
import React from 'react';
import styles from './Collection.module.scss';
const obj = {
  title: 'hrusha',
  description: 'крутая свинюха на забив пойдет',
  image:
    'https://st.depositphotos.com/1039721/2414/i/600/depositphotos_24143701-stock-photo-pig-farm.jpg',
};
function Collection() {
  return (
    <div className={styles.root}>
      <Typography classes={{ root: styles.title }} variant="h4">
        {obj.title.toUpperCase()}
      </Typography>
      <img className={styles.image} src={obj.image} alt="cover" />
    </div>
  );
}

export default Collection;
