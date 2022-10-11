import { Add } from '@mui/icons-material';
import { Typography, Button } from '@mui/material';
import React from 'react';
import Post from '../../components/Post/Post';
import styles from './Collection.module.scss';

const arr2 = [
  {
    title: 'hrusha',
    description: 'крутая свинюха на забив пойдет',
    image:
      'https://st.depositphotos.com/1039721/2414/i/600/depositphotos_24143701-stock-photo-pig-farm.jpg',
  },
  {
    title: 'sobaka',
    description: 'eto pes ochen kruyoi imya garik',
    image: 'https://mobimg.b-cdn.net/v3/fetch/0e/0e26b1b65946ee36fac9605ae67e4ac8.jpeg',
  },
  {
    title: 'kot',
    description: 'afSKNgosjrgnpoadrngpoerngpoerngporstngpisrn',
    image: 'https://s13.stc.yc.kpcdn.net/share/i/instagram/B44solahwlo/wr-1280.webp',
  },
  {
    title: 'hrusha',
    description: 'крутая свинюха на забив пойдет',
    image:
      'https://st.depositphotos.com/1039721/2414/i/600/depositphotos_24143701-stock-photo-pig-farm.jpg',
  },
  {
    title: 'sobaka',
    description: 'eto pes ochen kruyoi imya garik',
    image: 'https://mobimg.b-cdn.net/v3/fetch/0e/0e26b1b65946ee36fac9605ae67e4ac8.jpeg',
  },
  {
    title: 'kot',
    description: 'afSKNgosjrgnpoadrngpoerngpoerngporstngpisrn',
    image: 'https://s13.stc.yc.kpcdn.net/share/i/instagram/B44solahwlo/wr-1280.webp',
  },
];

function Collection() {
  return (
    <div className={styles.root}>
      <Typography classes={{ root: styles.root_title }} variant="h4">
        Моя коллекция
      </Typography>
      <Button variant="outlined" startIcon={<Add />}>
        Добавить коллекцию
      </Button>
      <div className={styles.collection}>
        {arr2.map((e, id) => (
          <div key={id} className={styles.post}>
            <Post title={e.title} description={e.description} image={e.image} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collection;
