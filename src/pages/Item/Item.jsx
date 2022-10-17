import { Typography, TextField, Button, Box } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Item.module.scss';
import { Edit, Done } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { addComment, updateItem } from '../../redux/slices/item';
import fullDate from '../../components/Date';
function Item() {
  const [isChange, setChange] = React.useState(false);
  const [value, setValue] = React.useState('');
  const { rows } = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const { id } = useParams();
  const number = id.slice(1) - 1;
  const comments = rows[number].comments;
  const [name, setName] = React.useState(rows[number].name);
  const [type, setType] = React.useState(rows[number].type);
  const [tags, setTags] = React.useState(rows[number].tags);
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        {isChange ? (
          <Button
            sx={{ position: 'absolute', left: '80%' }}
            startIcon={<Done />}
            variant="contained"
            onClick={() => {
              dispatch(updateItem({ id: number, name: name, type: type, tags: tags }));
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
        )}
        <Typography classes={{ root: styles.title }} variant="h4">
          Имя
        </Typography>
        <Typography classes={{ root: styles.description }} variant="body1">
          {isChange ? (
            <TextField value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            rows[number].name
          )}
        </Typography>
        <Typography classes={{ root: styles.title }} variant="h4">
          Тип
        </Typography>
        <Typography classes={{ root: styles.description }} variant="body1">
          {isChange ? (
            <TextField value={type} onChange={(e) => setType(e.target.value)} />
          ) : (
            rows[number].type
          )}
        </Typography>
        <Typography classes={{ root: styles.title }} variant="h4">
          Тэги
        </Typography>
        <Typography classes={{ root: styles.description }} variant="body1">
          {isChange ? (
            <TextField value={tags} onChange={(e) => setTags(e.target.value)} />
          ) : (
            rows[number].tags
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
              dispatch(addComment({ id: number, name: 'yarik', text: value, date: fullDate() }));
              setValue('');
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
          {comments.length === 0 ? (
            <>Ещё никто не комментировал данный предмет, будьте первым!</>
          ) : (
            comments.map((e, i) => (
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
          )}
        </Box>
      </div>
    </div>
  );
}

export default Item;
