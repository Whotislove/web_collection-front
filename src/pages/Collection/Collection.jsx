import { Box, Button, TextField, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Collection.module.scss';
import { DataGrid } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';
import { addItem, removeItem } from '../../redux/slices/item';
import { Link } from 'react-router-dom';

const obj = {
  title: 'hrusha',
  description:
    'крутая свинюха на забив пойдет ыЩАШофыущзгаащз УЫЩЗАщыУОАЩШыУЩОАошЫУАоЫУЗАЩшоЫУЩЗАшоЫуазыщуоаЗЩОЩЗЫУОШАщзЫУШОАзщЫУШОАЫЩЗУШАОЫЩЗУШАО',
  image:
    'https://st.depositphotos.com/1039721/2414/i/600/depositphotos_24143701-stock-photo-pig-farm.jpg',
};

function Collection() {
  const [selectedItem, setSelectedItem] = React.useState();
  const [isSelect, setIsSelect] = React.useState([]);
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
      comments: [],
    },
    mode: 'onChange',
  });
  const { columns, rows } = useSelector((state) => state.item);
  const onSubmit = (values) => {
    dispatch(addItem(values));
  };
  const deleteItem = (id) => {
    dispatch(removeItem(id));
  };
  return (
    <div className={styles.root}>
      <Typography classes={{ root: styles.title }} variant="h4">
        {obj.title.toUpperCase()}
      </Typography>
      <Typography classes={{ root: styles.theme }} variant="h6">
        Тема
      </Typography>
      <img className={styles.image} src={obj.image} alt="cover" />
      <Typography classes={{ root: styles.title_description }} variant="h4">
        Описание
      </Typography>
      <Typography classes={{ root: styles.description }} variant="body1">
        {obj.description}
      </Typography>
      <Typography classes={{ root: styles.item }} variant="h4">
        Предметы
      </Typography>
      <div className={styles.item_content}>
        <div className={styles.item_wrapper}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            onSelectionModelChange={(e) => setIsSelect(e)}
            onRowClick={(data) => setSelectedItem(data.id)}
            rowsPerPageOptions={[5]}
            pageSize={5}
          />
          {isSelect.length !== 0 && (
            <div className={styles.item_buttons}>
              <Link className={styles.item_buttons_open} to={`/item/:${selectedItem}`}>
                <Button sx={{ marginRight: 1 }} variant="outlined">
                  Открыть
                </Button>
              </Link>
              <Button
                variant="contained"
                startIcon={<Delete />}
                onClick={() => deleteItem(selectedItem)}>
                Удалить
              </Button>
            </div>
          )}
        </div>
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
      </div>
    </div>
  );
}

export default Collection;
