import { Box, Button, TextField, Typography } from '@mui/material';
import { Delete, Edit, Done } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Collection.module.scss';
import { DataGrid } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useParams, Navigate } from 'react-router-dom';
import axios from '../../axios';
import ReactMarkdown from 'react-markdown';

function Collection() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState({});
  const [isSelect, setIsSelect] = React.useState([]);
  const [data, setData] = React.useState({});
  const [items, setItems] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();
  const { user, isAuth, theme, language } = useSelector((state) => state.user);
  const isEn = language === 'en';
  const color = theme === 'light' ? 'rgba(10, 25, 41)' : 'white';
  React.useEffect(() => {
    axios
      .get(`/collection/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка получения статьи');
      });
    axios
      .get(`/collection/${id}/item`)
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка получения предметов');
      });
  }, []);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: null,
      type: null,
      tags: [],
      comments: [],
    },
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    const first = await axios.post(`collection/${id}/item`, { id: items.length + 1, ...values });
    const second = await axios
      .get(`/collection/${id}/item`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка получения предметов');
      });
  };
  const deleteItem = async (_id) => {
    const first = await axios.delete(`collection/${id}/item`, { data: { id: _id } });
    const second = await axios
      .get(`/collection/${id}/item`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка получения предметов');
      });
  };
  const deleteCollection = () => {
    try {
      if (window.confirm('Вы действительно хотите удалить коллекцию?')) {
        axios.delete(`collection/${id}`);
        navigate('/');
      }
    } catch (error) {
      console.warn(error);
    }
  };

  if (isLoading) {
    {
      isEn ? <>LOADING</> : <>ЗАГРУЗКА</>;
    }
  }
  const nameInput = isEn ? 'Enter name' : 'Укажите название';
  const tagsInput = isEn ? 'Enter tags' : 'Укажите тэги';
  const typeInput = isEn ? 'Enter type' : 'Укажите тип';
  const nameInTable = isEn ? 'Name' : 'Название';
  const tagsInTable = isEn ? 'Tags' : 'Тэги';
  const typeInTable = isEn ? 'Type' : 'Тип';
  const columns = [
    { field: 'id', headerName: 'Id', width: 90 },
    { field: 'name', headerName: nameInTable, width: 150 },
    { field: 'type', headerName: typeInTable, width: 120 },
    { field: 'tags', headerName: tagsInTable, width: 150 },
  ];
  return (
    <div className={styles.root}>
      <Typography classes={{ root: styles.title }} variant="h4" color={color}>
        {data.title}
      </Typography>
      {isAuth && (user.status === 'admin' || data.user === user._id) && (
        <div className={styles.top_buttons}>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => navigate(`/collection/${id}/edit`)}>
            {isEn ? <>Edit</> : <>Редактировать</>}
          </Button>

          <Button
            variant="contained"
            startIcon={<Delete />}
            color="error"
            onClick={deleteCollection}>
            {isEn ? <>Delete collection</> : <>Удалить коллекцию</>}
          </Button>
        </div>
      )}
      <Typography classes={{ root: styles.theme }} variant="h6" color={color}>
        {data.type}
      </Typography>
      <img
        className={styles.image}
        src={`${process.env.REACT_APP_API_URL}${data.imageUrl}`}
        // src={`http://localhost:1111${data.imageUrl}`}
        alt="cover"
      />
      <Typography classes={{ root: styles.title_description }} variant="h4" color={color}>
        {isEn ? <>Description</> : <>Описание</>}
      </Typography>
      <Typography classes={{ root: styles.description }} variant="body1" color={color}>
        <ReactMarkdown>{data.description}</ReactMarkdown>
      </Typography>
      <Typography classes={{ root: styles.item }} variant="h4" color={color}>
        {isEn ? <>Items</> : <>Предметы</>}
      </Typography>
      <div className={styles.item_content}>
        <div className={styles.item_wrapper}>
          <DataGrid
            rows={items}
            columns={columns}
            autoHeight
            onSelectionModelChange={(e) => setIsSelect(e)}
            onRowClick={(data) => setSelectedItem({ id: data.id, _id: data.row._id })}
            rowsPerPageOptions={[5]}
            pageSize={5}
            sx={{ color }}
          />
          {isSelect.length !== 0 && (
            <div className={styles.item_buttons}>
              <Link
                className={styles.item_buttons_open}
                to={`/collection/${id}/item/${selectedItem._id}`}>
                <Button sx={{ marginRight: 1 }} variant="outlined">
                  {isEn ? <>Open</> : <>Открыть</>}
                </Button>
              </Link>
              {isAuth && (user.status === 'admin' || data.user === user._id) && (
                <Button
                  variant="contained"
                  startIcon={<Delete />}
                  onClick={() => deleteItem(selectedItem._id)}
                  color="error">
                  {isEn ? <>Delete</> : <>Удалить</>}
                </Button>
              )}
            </div>
          )}
        </div>
        {isAuth && (user.status === 'admin' || data.user === user._id) && (
          <div className={styles.inputBlock}>
            <Box
              sx={{
                textAlign: 'center',
                bgcolor: 'white',
                padding: 1,
                borderRadius: '8px',
              }}
              classes={{ root: styles.input }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label={isEn ? 'Name' : 'Название'}
                  margin="normal"
                  variant="outlined"
                  error={Boolean(errors.name?.message)}
                  helperText={errors.name?.message}
                  {...register('name', { required: nameInput })}
                />
                <TextField
                  label={isEn ? 'Type' : 'Тип'}
                  margin="normal"
                  variant="outlined"
                  error={Boolean(errors.type?.message)}
                  helperText={errors.type?.message}
                  {...register('type', { required: typeInput })}
                />
                <TextField
                  label={isEn ? 'Tags' : 'Тэги'}
                  margin="normal"
                  variant="outlined"
                  error={Boolean(errors.tags?.message)}
                  helperText={errors.tags?.message}
                  {...register('tags', { required: tagsInput })}
                />
                <Button disabled={!isValid} type="submit" variant="contained">
                  {isEn ? <>Add item</> : <>Добавить предмет</>}
                </Button>
              </form>
            </Box>
          </div>
        )}
      </div>
    </div>
  );
}

export default Collection;
