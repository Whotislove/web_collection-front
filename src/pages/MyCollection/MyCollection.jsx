import { Add } from '@mui/icons-material';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import Post from '../../components/Post/Post';
import styles from './Collection.module.scss';
import axios from '../../axios';

function Collection() {
  const [data, setData] = React.useState([]);
  const dataLength = data.length === 0;
  React.useEffect(() => {
    axios.get('/mycollection').then((res) => setData(res.data));
  }, []);
  return (
    <div className={styles.root}>
      <Typography classes={{ root: styles.root_title }} variant="h4">
        Моя коллекция
      </Typography>
      <Button variant="outlined" startIcon={<Add />}>
        Добавить коллекцию
      </Button>
      <div className={styles.collection}>
        {dataLength ? (
          <>Загрузка</>
        ) : (
          data.map((e, id) => (
            <div key={id} className={styles.post}>
              <Link to={`/collection/${e._id}`} className={styles.link}>
                <Post title={e.title} type={e.type} image={e.image} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Collection;
