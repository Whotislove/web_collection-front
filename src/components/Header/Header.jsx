import { Button } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from '../Search/Search';
import styles from './Header.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/slices/user';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickOut = () => {
    dispatch(logOut());
    window.localStorage.removeItem('token');
    navigate('/');
  };
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.wrapper}>
          <Link to="/" className={styles.logo}>
            <Button variant="contained">Web Collection</Button>
          </Link>
          {location.pathname !== '/login' && location.pathname !== '/register' && <Search />}
          <div className={styles.buttons}>
            {!!Object.keys(user).length ? (
              <div className={styles.ifAuth}>
                <Link to="/mycollection">
                  <div className={styles.name}>{user.fullName}</div>
                </Link>
                <Button variant="contained" onClick={() => onClickOut()}>
                  Выйти
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Зарегистрироваться</Button>{' '}
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
