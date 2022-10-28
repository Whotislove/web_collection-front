import { Button } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from '../Search/Search';
import styles from './Header.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme, logOut, changeLanguage } from '../../redux/slices/user';
import { useNavigate } from 'react-router-dom';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
function Header() {
  const { theme, language } = useSelector((state) => state.user);
  const isLight = theme === 'light';
  const isEn = language === 'en';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    const getTheme = window.localStorage.getItem('theme');
    const getLanguage = window.localStorage.getItem('language');
    dispatch(changeTheme(getTheme || 'light'));
    dispatch(changeLanguage(getLanguage || 'en'));
  }, []);
  const onClickOut = () => {
    dispatch(logOut());
    window.localStorage.removeItem('token');
    navigate('/');
  };
  const onClickMoon = () => {
    window.localStorage.setItem('theme', 'dark');
    dispatch(changeTheme('dark'));
  };
  const onClickSun = () => {
    window.localStorage.setItem('theme', 'light');
    dispatch(changeTheme('light'));
  };
  const onClickRu = () => {
    window.localStorage.setItem('language', 'en');
    dispatch(changeLanguage('en'));
  };
  const onClickEng = () => {
    window.localStorage.setItem('language', 'ru');
    dispatch(changeLanguage('ru'));
  };
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <div className={isLight ? styles.root_light : styles.root_dark}>
      <Container maxWidth="lg">
        <div className={styles.wrapper}>
          <Link to="/" className={styles.logo}>
            <Button variant="contained">Web Collection</Button>
          </Link>
          {location.pathname !== '/login' && location.pathname !== '/register' && <Search />}
          <div className={styles.buttons}>
            <div className={styles.language} onClick={language === 'en' ? onClickEng : onClickRu}>
              {language}
            </div>
            <div className={isLight ? styles.icon_light : styles.icon_dark}>
              {isLight ? (
                <Brightness2Icon onClick={onClickMoon} />
              ) : (
                <WbSunnyIcon onClick={onClickSun} />
              )}
            </div>

            {!!Object.keys(user).length ? (
              <div className={styles.ifAuth}>
                <Link to="/mycollection">
                  <div className={isLight ? styles.name_light : styles.name_dark}>
                    {user.fullName}
                  </div>
                </Link>
                <Button variant="contained" onClick={() => onClickOut()}>
                  {isEn ? <>Sign out</> : <>Выйти</>}
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">{isEn ? <>Sign in</> : <>Войти</>}</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">
                    {isEn ? <>Create account</> : <>Зарегистрироваться</>}
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
