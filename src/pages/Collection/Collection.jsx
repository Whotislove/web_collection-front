import { Box, Button, TextField, Typography } from '@mui/material';
import { Delete, PendingActionsOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Collection.module.scss';
import { DataGrid } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
const columns = [
  { field: 'id', headerName: 'Id', width: 90 },
  { field: 'name', headerName: 'Название', width: 150 },
  { field: 'type', headerName: 'Тип', width: 120 },
  { field: 'tags', headerName: 'Тэги', width: 150 },
];

function Collection() {
  const [selectedItem, setSelectedItem] = React.useState({});
  const [isSelect, setIsSelect] = React.useState([]);
  const [data, setData] = React.useState({});
  const [items, setItems] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
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
  const dispatch = useDispatch();
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
  if (isLoading) {
    return <>ЗАГРУЗКА</>;
  }
  return (
    <div className={styles.root}>
      <Typography classes={{ root: styles.title }} variant="h4">
        {data.title}
      </Typography>
      <Typography classes={{ root: styles.theme }} variant="h6">
        {data.type}
      </Typography>
      <img className={styles.image} src={data.image} alt="cover" />
      <Typography classes={{ root: styles.title_description }} variant="h4">
        Описание
      </Typography>
      <Typography classes={{ root: styles.description }} variant="body1">
        {data.description}
      </Typography>
      <Typography classes={{ root: styles.item }} variant="h4">
        Предметы
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
          />
          {isSelect.length !== 0 && (
            <div className={styles.item_buttons}>
              <Link
                className={styles.item_buttons_open}
                to={`/collection/${id}/item/${selectedItem._id}`}>
                <Button sx={{ marginRight: 1 }} variant="outlined">
                  Открыть
                </Button>
              </Link>
              {Boolean(Object.keys(user).length) && (
                <Button
                  variant="contained"
                  startIcon={<Delete />}
                  onClick={() => deleteItem(selectedItem._id)}>
                  Удалить
                </Button>
              )}
            </div>
          )}
        </div>
        {Boolean(Object.keys(user).length) && (
          <Box sx={{ width: '30%', textAlign: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Название"
                margin="normal"
                variant="outlined"
                error={Boolean(errors.name?.message)}
                helperText={errors.name?.message}
                {...register('name', { required: 'Укажите название' })}
              />
              <TextField
                label="Тип"
                margin="normal"
                variant="outlined"
                error={Boolean(errors.type?.message)}
                helperText={errors.type?.message}
                {...register('type', { required: 'Укажите тип' })}
              />
              <TextField
                label="Тэги"
                margin="normal"
                variant="outlined"
                error={Boolean(errors.tags?.message)}
                helperText={errors.tags?.message}
                {...register('tags', { required: 'Укажите тэги' })}
              />
              <Button disabled={!isValid} type="submit" variant="contained">
                Добавить предмет
              </Button>
            </form>
          </Box>
        )}
      </div>
    </div>
  );
}

export default Collection;
