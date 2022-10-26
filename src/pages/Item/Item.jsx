import { Typography, TextField, Button, Box } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Item.module.scss';
import { Edit, Done, AddComment } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import fullDate from '../../components/Date';
import axios from '../../axios';
function Item() {
  const [isChange, setChange] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const { collectionId, itemId } = useParams();
  const [name, setName] = React.useState();
  const [type, setType] = React.useState();
  const [tags, setTags] = React.useState([]);
  const { isAuth, user } = useSelector((state) => state.user);
  React.useEffect(() => {
    axios
      .get(`/collection/${collectionId}/item/${itemId}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setName(res.data.name);
        setType(res.data.type);
        setTags(res.data.tags);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка получения статьи');
      });
  }, []);
  const addComment = async () => {
    const first = await axios
      .patch(`/collection/${collectionId}/itemComment/${itemId}`, {
        name: user.fullName,
        date: fullDate(),
        text: value,
      })
      .then((res) => setValue(''))
      .catch((err) => {
        console.log(err);
        alert('Ошибка');
      });
    const second = await axios
      .get(`/collection/${collectionId}/item/${itemId}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setName(res.data.name);
        setType(res.data.type);
        setTags(res.data.tags);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка получения статьи');
      });
  };
  const updateItem = async (values) => {
    const first = await axios
      .patch(`/collection/${collectionId}/item/${itemId}`, values)
      .catch((error) => {
        console.log(error);
        alert('Не удалось обновить предмет');
      });
  };
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        {isAuth &&
          (isChange ? (
            <Button
              sx={{ position: 'absolute', left: '80%' }}
              startIcon={<Done />}
              variant="contained"
              onClick={() => {
                updateItem({
                  name: name,
                  type: type,
                  tags: typeof tags === 'string' ? tags.split(',') : tags,
                });

                setChange(false);
              }}>
              Сохранить
            </Button>
          ) : (
            <Button
              sx={{ position: 'absolute', left: '80%' }}
              startIcon={<Edit />}
              variant="contained"
              onClick={() => setChange(true)}>
              Редактировать
            </Button>
          ))}
        <Typography classes={{ root: styles.title }} variant="h4">
          Название
        </Typography>
        <Typography classes={{ root: styles.description }} variant="body1">
          {isChange ? (
            <TextField value={name} onChange={(e) => setName(e.target.value)} />
          ) : isLoading ? (
            <>Загрузка</>
          ) : (
            name
          )}
        </Typography>
        <Typography classes={{ root: styles.title }} variant="h4">
          Тип
        </Typography>
        <Typography classes={{ root: styles.description }} variant="body1">
          {isChange ? (
            <TextField value={type} onChange={(e) => setType(e.target.value)} />
          ) : isLoading ? (
            <>Загрузка</>
          ) : (
            type
          )}
        </Typography>
        <Typography classes={{ root: styles.title }} variant="h4">
          Тэги
        </Typography>
        <Typography classes={{ root: styles.description }} variant="body1">
          {isChange ? (
            <TextField value={tags} onChange={(e) => setTags(e.target.value.split(','))} />
          ) : isLoading ? (
            <>Загрузка</>
          ) : (
            <div className={styles.tags_container}>
              {tags.map((e, i) => (
                <div key={i} className={styles.tag}>{`#${e}`}</div>
              ))}
            </div>
          )}
        </Typography>
      </div>

      <div className={styles.comments}>
        <Typography
          sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 2.5 }}
          variant="h4">
          Комментарии
        </Typography>
        <div className={styles.comments_send}>
          <TextField
            placeholder="Оставьте комментарий"
            sx={{ width: '80%' }}
            value={value}
            multiline
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            onClick={() => {
              addComment();
            }}
            disabled={value.length === 0}
            fontSize="large"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ marginLeft: 1.5 }}>
            Отправить
          </Button>
        </div>
        <Box
          sx={{
            backgroundColor: 'rgb(204, 203, 203)',
            padding: 2.5,
            marginTop: 4,
            borderRadius: '8px',
          }}>
          {isLoading ? (
            <>Загрузка</>
          ) : isAuth ? (
            data.comments.length === 0 ? (
              <>Ещё никто не комментировал данный предмет, будьте первым!</>
            ) : (
              data.comments.map((e, i) => (
                <Box
                  key={i}
                  sx={{
                    backgroundColor: 'white',
                    padding: 2.5,
                    marginTop: 4,
                    borderRadius: '8px',
                  }}>
                  <div className={styles.header}>
                    <Typography variant="h4">{e.name}</Typography>
                    <Typography
                      sx={{ marginLeft: 1.25, opacity: 0.6, fontSize: '14px' }}
                      variant="h6">
                      {e.date}
                    </Typography>
                  </div>

                  <Typography variant="body1">{e.text}</Typography>
                </Box>
              ))
            )
          ) : (
            <>Комментарии могут оставлять только авторизированные пользователи</>
          )}
        </Box>
      </div>
    </div>
  );
}

export default Item;
