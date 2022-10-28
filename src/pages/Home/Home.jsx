import React from 'react';
import Post from '../../components/Post/Post';
import styles from './Home.module.scss';
import { NavigateNext, NavigateBefore } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollections } from '../../redux/slices/collections';
import { Link } from 'react-router-dom';

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
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchCollections());
  }, []);
  const { collections, biggest, status } = useSelector((state) => state.collections);
  const { theme, language } = useSelector((state) => state.user);
  const isEn = language === 'en';
  const isLoading = status === 'loaded';
  const isLight = theme === 'light';
  const color = theme === 'light' ? 'rgba(10, 25, 41)' : 'white';
  const [number, setNumber] = React.useState(0);
  const onClickBefore = () => {
    setNumber(number === 0 ? biggest.length - 1 : number - 1);
  };
  const onClickNext = () => {
    setNumber(number === biggest.length - 1 ? 0 : number + 1);
  };
  return (
    <div className={styles.parent}>
      <div className={styles.top}>
        <div className={styles.popular}>
          <span className={isLight ? styles.article_light : styles.article_dark}>
            {isEn ? <>The largest collections</> : <>Самые большие коллекции</>}
          </span>
          {isLoading ? (
            <Link to={`/collection/${biggest[number]._id}`} className={styles.link}>
              <Post
                title={biggest[number].title}
                type={biggest[number].type}
                image={biggest[number].imageUrl}
                id={biggest[number]._id}
              />
            </Link>
          ) : isEn ? (
            <>Loading</>
          ) : (
            <>Загрузка</>
          )}
          <div className={styles.underSlider}>
            <Button sx={{ color: color, borderRadius: 50 }} onClick={() => onClickBefore()}>
              <NavigateBefore sx={{ fontSize: 50, cursor: 'pointer' }} />
            </Button>
            <Button sx={{ color: color, borderRadius: 50 }} onClick={() => onClickNext()}>
              <NavigateNext sx={{ fontSize: 50, cursor: 'pointer' }} />
            </Button>
          </div>
        </div>
        <div className={styles.tags}>
          <span className={isLight ? styles.article_light : styles.article_dark}>
            {isEn ? <>Tags</> : <>Тэги</>}
          </span>
          <div className={styles.tags_container}>
            {tags.map((e, i) => (
              <div key={i} className={styles.tag}>{`#${e}`}</div>
            ))}
          </div>
        </div>
      </div>
      <p className={isLight ? styles.title_light : styles.title_dark}>
        {isEn ? <>Collections</> : <>Коллекции</>}
      </p>
      <div className={styles.collection}>
        {collections.map((e, id) => (
          <div key={id} className={styles.post}>
            <Link to={`/collection/${e._id}`} className={styles.link}>
              <Post title={e.title} type={e.type} image={e.imageUrl} id={e._id} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
