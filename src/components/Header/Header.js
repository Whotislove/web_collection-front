import { Button } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import styles from './Header.module.scss';

function Header() {
  const [isAuth, setIsAuth] = React.useState(false);
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.wrapper}>
          <Link to="/" className={styles.logo}>
            Web Collection
          </Link>
          <Search />
          <div className={styles.buttons}>
            {isAuth ? (
              <div className={styles.ifAuth}>
                <div className={styles.name}>Залупкин</div>
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
