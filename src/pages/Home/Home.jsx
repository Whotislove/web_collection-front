import React from 'react';
import Post from '../../components/Post/Post';
import styles from './Home.module.scss';
import { NavigateNext, NavigateBefore } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux/es/exports';
const arr = [
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

const tags = [
  'kotiki',
  'sobachki',
  'svini',
  'cherepasshki',
  'kotiki',
  'sobachki',
  'svini',
  'cherepasshki',
  'kotiki',
  'sobachki',
  'svini',
  'cherepasshki',
  'kotiki',
  'sobachki',
  'svini',
  'cherepasshki',
];
const Home = () => {
  const { collections } = useSelector((state) => state.collections);
  // const dispatch = useDispatch();
  const [number, setNumber] = React.useState(0);
  const onClickBefore = () => {
    setNumber(number === 0 ? arr.length - 1 : number - 1);
  };
  const onClickNext = () => {
    setNumber(number === arr.length - 1 ? 0 : number + 1);
  };
  return (
    <div className={styles.parent}>
      <div className={styles.top}>
        <div className={styles.popular}>
          <span className={styles.article}>Популярные коллекции</span>
          <Post
            title={arr[number].title}
            description={arr[number].description}
            image={arr[number].image}
          />
          <div className={styles.underSlider}>
            <Button sx={{ color: 'black', borderRadius: 50 }} onClick={() => onClickBefore()}>
              <NavigateBefore sx={{ fontSize: 50, cursor: 'pointer' }} />
            </Button>
            <Button sx={{ color: 'black', borderRadius: 50 }} onClick={() => onClickNext()}>
              <NavigateNext sx={{ fontSize: 50, cursor: 'pointer' }} />
            </Button>
          </div>
        </div>
        <div className={styles.tags}>
          <span className={styles.article}>Тэги</span>
          <div className={styles.tags_container}>
            {tags.map((e, i) => (
              <div key={i} className={styles.tag}>{`#${e}`}</div>
            ))}
          </div>
        </div>
      </div>
      <p className={styles.title}>Коллекции</p>
      <div className={styles.collection}>
        {collections.map((e, id) => (
          <div key={id} className={styles.post}>
            <Post title={e.title} description={e.description} image={e.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
