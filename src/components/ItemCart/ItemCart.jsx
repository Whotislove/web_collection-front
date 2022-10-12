import React from 'react';
import styles from './ItemCart.module.scss';
import { Edit, Delete } from '@mui/icons-material';
function ItemCart({ item }) {
  console.log(item);
  return (
    <div className={styles.root}>
      <div className={styles.icons}>
        <Edit classes={{ root: styles.icon }} onClick={() => alert('edit')} />
        <Delete classes={{ root: styles.icon }} onClick={() => alert('delete')} />
      </div>

      <h3>{item.name}</h3>
      <h5>{item.type}</h5>
      <p>{item.description}</p>
      <p>{item.tags}</p>
    </div>
  );
}

export default ItemCart;
