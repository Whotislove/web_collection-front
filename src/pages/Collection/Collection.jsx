import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setItem } from '../../redux/slices/item';
import styles from './Collection.module.scss';
import ItemCart from '../../components/ItemCart/ItemCart';
const obj = {
  title: 'hrusha',
  description:
    'крутая свинюха на забив пойдет ыЩАШофыущзгаащз УЫЩЗАщыУОАЩШыУЩОАошЫУАоЫУЗАЩшоЫУЩЗАшоЫуазыщуоаЗЩОЩЗЫУОШАщзЫУШОАзщЫУШОАЫЩЗУШАОЫЩЗУШАО',
  image:
    'https://st.depositphotos.com/1039721/2414/i/600/depositphotos_24143701-stock-photo-pig-farm.jpg',
};

function Collection() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'xren',
      type: 'Whiskey',
      description: 'old but gold',
      tags: '#opaopa #suda #yaya',
    },
    {
      id: 2,
      name: 'ronin',
      type: 'Whiskey',
      description: 'ne old i ne gold ',
      tags: '#opaopa #wanuchii #yaya',
    },
  ]);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  return (
    <div className={styles.root}>
      <Typography classes={{ root: styles.title }} variant="h4">
        {obj.title.toUpperCase()}
      </Typography>
      <Typography classes={{ root: styles.theme }} variant="h6">
        Тема
      </Typography>
      <img className={styles.image} src={obj.image} alt="cover" />
      <Typography classes={{ root: styles.title_description }} variant="h4">
        Описание
      </Typography>
      <Typography classes={{ root: styles.description }} variant="body1">
        {obj.description}
      </Typography>
      <Typography classes={{ root: styles.item }} variant="h4">
        Предметы
      </Typography>
      <div className={styles.items}>
        {items.map((e, i) => (
          <ItemCart key={i} item={e} />
        ))}
      </div>
    </div>
  );
}

export default Collection;
