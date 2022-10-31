import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Users.module.scss';
import axios from '../../axios';
import {
  setRows,
  onBlock,
  onUnlock,
  setAdmin,
  setUser,
  deleteAdmin,
} from '../../redux/slices/user';
import { useNavigate, Navigate } from 'react-router';

function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = React.useState({});
  const [isSelect, setIsSelect] = React.useState([]);
  React.useEffect(() => {
    axios.get('/users').then((res) => dispatch(setRows(res.data)));
  }, []);
  const { isAuth, theme, language, user, rows } = useSelector((state) => state.user);
  const isEn = language === 'en';
  const color = theme === 'light' ? 'rgba(10, 25, 41)' : 'white';
  const columns = [
    { field: 'id', headerName: 'Id', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];
  const onClickBlock = () => {
    axios.patch('/users', { _id: selectedItem._id, status: 'block' });
    dispatch(onBlock({ id: selectedItem.id }));
  };
  const onClickUnlock = () => {
    axios.patch('/users', { _id: selectedItem._id, status: 'user' });
    dispatch(onUnlock({ id: selectedItem.id }));
  };
  const onClickAdmin = () => {
    axios.patch('/users', { _id: selectedItem._id, status: 'admin' });
    dispatch(setAdmin({ id: selectedItem.id }));
  };
  const onClickUser = () => {
    axios.patch('/users', { _id: selectedItem._id, status: 'user' });
    dispatch(setUser({ id: selectedItem.id }));
    if (user._id === selectedItem._id) {
      navigate('/mycollection');
      dispatch(deleteAdmin());
    }
  };

  if (!window.localStorage.getItem('token') && !isAuth) {
    alert('Нет доступа');
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.root}>
      <Typography
        sx={{ fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}
        variant="h4"
        color={color}>
        {isEn ? <>Users</> : <>Пользователи</>}
      </Typography>
      <div className={styles.table}>
        <DataGrid
          onSelectionModelChange={(e) => setIsSelect(e)}
          columns={columns}
          rows={rows}
          autoHeight
          rowsPerPageOptions={[5]}
          onRowClick={(data) =>
            setSelectedItem({ id: data.row.id, _id: data.row._id, status: data.row.status })
          }
          pageSize={5}
          sx={{ color }}
        />
        <div className={styles.buttons}>
          {isSelect.length !== 0 && (
            <>
              {selectedItem.status === 'admin' ? (
                <Button variant="contained" onClick={onClickUser}>
                  Удалить из админов
                </Button>
              ) : (
                <Button variant="contained" onClick={onClickAdmin}>
                  Сделать админом
                </Button>
              )}

              {selectedItem.status === 'block' ? (
                <Button variant="contained" onClick={onClickUnlock}>
                  Разблокировать
                </Button>
              ) : (
                <Button variant="contained" onClick={onClickBlock}>
                  Заблокировать
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
