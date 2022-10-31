import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddCollection.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import axios from '../../axios';

export const AddCollection = () => {
  const [isEditable, setEditable] = React.useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [type, setType] = React.useState('');
  const [title, setTitle] = React.useState('');
  const isValid = imageUrl && description && type && title;
  const { isAuth, language } = useSelector((state) => state.user);
  const isEn = language === 'en';
  const inputFileRef = React.useRef(null);

  React.useEffect(() => {
    if (id) {
      axios
        .get(`collection/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setType(res.data.type);
          setImageUrl(res.data.imageUrl);
          setDescription(res.data.description);
        })
        .catch((error) => {
          console.log(error);
        });
      setEditable(true);
    }
  }, []);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при загрузке файла');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };
  const onSubmit = async () => {
    try {
      const values = {
        title,
        imageUrl,
        type,
        description,
      };
      const { data } = await axios.post('/collection', values);
      const id = data._id;
      navigate(`/collection/${id}`);
    } catch (error) {}
  };
  const onSave = async () => {
    const values = {
      title,
      imageUrl,
      type,
      description,
    };
    await axios.patch(`/collection/${id}`, values);
    navigate(`/collection/${id}`);
  };
  const onChange = React.useCallback((value) => {
    setDescription(value);
  }, []);
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter a description...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  if (!window.localStorage.getItem('token') && !isAuth) {
    alert('Нет доступа');
    return <Navigate to="/" />;
  }
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        {isEn ? <>Upload Image</> : <>Загрузить изображение</>}
      </Button>
      <input type="file" ref={inputFileRef} onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            {isEn ? <>Delete</> : <>Удалить</>}
          </Button>
          <img
            className={styles.image}
            src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
            // src={`http://localhost:1111${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder={isEn ? 'Collection name...' : 'Название коллекции...'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        sx={{ marginY: 3 }}
        variant="standard"
        placeholder={isEn ? 'Collection type' : 'Тип коллекции...'}
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <SimpleMDE
        className={styles.editor}
        value={description}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        {isEditable ? (
          <Button onClick={onSave} size="large" variant="contained">
            {isEn ? <>Save</> : <>Сохранить</>}
          </Button>
        ) : (
          <Button onClick={onSubmit} size="large" variant="contained" disabled={!isValid}>
            {isEn ? <>Publish сollection</> : <>Опубликовать коллекцию</>}
          </Button>
        )}
        <Link to="/" className={styles.link}>
          <Button size="large">{isEn ? <>Cancel</> : <>Отмена</>}</Button>
        </Link>
      </div>
    </Paper>
  );
};
