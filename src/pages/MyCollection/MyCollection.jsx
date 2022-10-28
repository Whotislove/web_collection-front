import { Add } from '@mui/icons-material';
import { Typography, Button } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import React from 'react';
import Post from '../../components/Post/Post';
import styles from './Collection.module.scss';
import axios from '../../axios';
import { useSelector } from 'react-redux';

function Collection() {
  const { isAuth, theme, language } = useSelector((state) => state.user);
  const isEn = language === 'en';
  const color = theme === 'light' ? 'rgba(10, 25, 41)' : 'white';
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    axios.get('/mycollection').then((res) => setData(res.data), setIsLoading(true));
  }, []);
  if (!window.localStorage.getItem('token') && !isAuth) {
    alert('Нет доступа');
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.root}>
      <Typography classes={{ root: styles.root_title }} variant="h4" sx={{ color }}>
        {isEn ? <>My collections</> : <>Мои коллекции</>}
      </Typography>
      <Link to="/addcollection" className={styles.link}>
        {' '}
        <Button variant="outlined" startIcon={<Add />}>
          {isEn ? <>Add collection</> : <>Добавить коллекцию</>}
        </Button>
      </Link>

      <div className={styles.collection}>
        {!isLoading ? (
          isEn ? (
            <>Loading...</>
          ) : (
            <>Загрузка...</>
          )
        ) : data.length === 0 ? (
          isEn ? (
            <>You have not added any collections</>
          ) : (
            <>Вы не добавили ни одной коллекции</>
          )
        ) : (
          data.map((e, id) => (
            <div key={id} className={styles.post}>
              <Link to={`/collection/${e._id}`} className={styles.link}>
                <Post title={e.title} type={e.type} image={e.imageUrl} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Collection;
