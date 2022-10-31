import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import styles from './Login.module.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from '../../axios';
import { addUserInfo } from '../../redux/slices/user';
const Login = () => {
  const { isAuth, theme, language } = useSelector((state) => state.user);
  const color = theme === 'light' ? 'rgba(10, 25, 41)' : 'white';
  const isEn = language === 'en';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    const { data } = await axios
      .post('login', values)
      .catch((res) => alert(res.response.data.message));
    if (data.status === 'block') {
      alert('Вы заблокированы');
    } else {
      dispatch(addUserInfo(data));
      if ('token' in data) {
        window.localStorage.setItem('token', data.token);
      }
    }
    if (data) {
      navigate('/');
    }
  };
  if (isAuth) {
    navigate('/');
  }
  return (
    <div className={styles.root}>
      <Typography classes={{ root: styles.title }} variant="h5" sx={{ color }}>
        {isEn ? <>Login</> : <>Вход в аккаунт</>}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="email"
          className={styles.field}
          label="Email"
          variant="outlined"
          sx={{ bgcolor: 'white', borderRadius: '8px' }}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          variant="outlined"
          sx={{ bgcolor: 'white', borderRadius: '8px' }}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth
        />
        <Typography sx={{ marginBottom: 2, color }}>
          {isEn ? (
            <>
              If you don't have an account yet,&nbsp;
              <Link className={styles.link} to="/register">
                register
              </Link>
            </>
          ) : (
            <>
              Если у вас ещё нет аккаунта,&nbsp;
              <Link className={styles.link} to="/register">
                зарегистрируйтесь
              </Link>
            </>
          )}
        </Typography>
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          {isEn ? <>Sign in</> : <>Войти</>}
        </Button>
      </form>
    </div>
  );
};

export default Login;
