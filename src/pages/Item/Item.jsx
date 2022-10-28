import { Typography, TextField, Button, Box } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Item.module.scss';
import { Edit, Done } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import fullDate from '../../components/Date';
import axios from '../../axios';
function Item() {
  const [isChange, setChange] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { collectionId, itemId } = useParams();
  const [name, setName] = React.useState();
  const [type, setType] = React.useState();
  const [tags, setTags] = React.useState([]);
  const { isAuth, user, theme, language } = useSelector((state) => state.user);
  const isEn = language === 'en';
  const color = theme === 'light' ? 'rgba(10, 25, 41)' : 'white';
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
              {isEn ? <>Save</> : <>Сохранить</>}
            </Button>
          ) : (
            <Button
              sx={{ position: 'absolute', left: '80%' }}
              startIcon={<Edit />}
              variant="contained"
              onClick={() => setChange(true)}>
              {isEn ? <>Edit</> : <>Редактировать</>}
            </Button>
          ))}
        <Typography classes={{ root: styles.title }} sx={{ color }} variant="h4">
          {isEn ? <>Name</> : <>Название</>}
        </Typography>
        <Typography classes={{ root: styles.description }} sx={{ color }} variant="body1">
          {isChange ? (
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ bgcolor: 'white', borderRadius: '8px' }}
            />
          ) : isLoading ? (
            isEn ? (
              <>Loading</>
            ) : (
              <>Загрузка</>
            )
          ) : (
            name
          )}
        </Typography>
        <Typography classes={{ root: styles.title }} sx={{ color }} variant="h4">
          {isEn ? <>Type</> : <>Тип</>}
        </Typography>
        <Typography classes={{ root: styles.description }} variant="body1" sx={{ color }}>
          {isChange ? (
            <TextField
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{ bgcolor: 'white', borderRadius: '8px' }}
            />
          ) : isLoading ? (
            isEn ? (
              <>Loading</>
            ) : (
              <>Загрузка</>
            )
          ) : (
            type
          )}
        </Typography>
        <Typography classes={{ root: styles.title }} variant="h4" sx={{ color }}>
          {isEn ? <>Tags</> : <>Тэги</>}
        </Typography>
        <Typography classes={{ root: styles.description }} variant="body1" sx={{ color }}>
          {isChange ? (
            <TextField
              value={tags}
              onChange={(e) => setTags(e.target.value.split(','))}
              sx={{ bgcolor: 'white', borderRadius: '8px' }}
            />
          ) : isLoading ? (
            isEn ? (
              <>Loading</>
            ) : (
              <>Загрузка</>
            )
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
          sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 2.5, color }}
          variant="h4">
          {isEn ? <>Comments</> : <>Комментарии</>}
        </Typography>
        <div className={styles.comments_send}>
          <TextField
            placeholder={isEn ? 'Leave a comment' : 'Оставьте комментарий'}
            sx={{ width: '80%', bgcolor: 'white', borderRadius: '8px' }}
            value={value}
            multiline
            disabled={!isAuth || value.length === 0}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            onClick={() => {
              addComment();
            }}
            disabled={!isAuth || value.length === 0}
            fontSize="large"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ marginLeft: 1.5 }}>
            {isEn ? <>Send</> : <>Отправить</>}
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
            isEn ? (
              <>Loading</>
            ) : (
              <>Загрузка</>
            )
          ) : isAuth ? (
            data.comments.length === 0 ? (
              isEn ? (
                <>No one has commented yet, be the first!!!</>
              ) : (
                <>Ещё никто не отправил комментарий, будьте первыми!!!</>
              )
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
          ) : isEn ? (
            <>Comments can be left only by authorized users</>
          ) : (
            <>Комментарии могут оставлять только авторизированные пользователи</>
          )}
        </Box>
      </div>
    </div>
  );
}

export default Item;
