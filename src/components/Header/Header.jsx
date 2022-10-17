import { Button } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from '../Search/Search';
import styles from './Header.module.scss';

function Header() {
  const location = useLocation();
  const [isAuth, setIsAuth] = React.useState(false);
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.wrapper}>
          <Link to="/" className={styles.logo}>
            <Button variant="contained">Web Collection</Button>
          </Link>
          {location.pathname !== '/login' && location.pathname !== '/register' && <Search />}
          <div className={styles.buttons}>
            {isAuth ? (
              <div className={styles.ifAuth}>
                <Link to="/mycollection">
                  <div className={styles.name}>Залупкин</div>
                </Link>
                <Button variant="contained" onClick={() => setIsAuth(false)}>
                  Выйти
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined" onClick={() => setIsAuth(true)}>
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained" onClick={() => setIsAuth(true)}>
                    Зарегистрироваться
                  </Button>{' '}
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
