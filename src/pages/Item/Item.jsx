import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Item.module.scss';
import { Edit } from '@mui/icons-material';
function Item() {
  const { item } = useSelector((state) => state.item);
  return (
    <div className={styles.root}>
      <Typography classes={{ root: styles.title }} variant="h4">
        Имя
        <Edit classes={{ root: styles.icon }} />
      </Typography>
      <Typography classes={{ root: styles.description }} variant="body1">
        {item.name}
      </Typography>
      <Typography classes={{ root: styles.title }} variant="h4">
        Тэги
        <Edit classes={{ root: styles.icon }} />
      </Typography>
      <Typography classes={{ root: styles.description }} variant="body1">
        {item.tags}
      </Typography>
    </div>
  );
}

export default Item;
