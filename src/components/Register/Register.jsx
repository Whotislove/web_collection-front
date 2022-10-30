import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import styles from './Register.module.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from '../../axios';
import { addUserInfo } from '../../redux/slices/user';
function Register() {
  const { isAuth, theme, language } = useSelector((state) => state.user);
  const isEn = language === 'en';
  const color = theme === 'light' ? 'rgba(10, 25, 41)' : 'white';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    const { data } = await axios
      .post('register', values)
      .catch((res) => alert(res.response.data.message));
    dispatch(addUserInfo(data));
    if ('token' in data) {
      window.localStorage.setItem('token', data.token);
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
        {isEn ? <>Registration</> : <>Регистрация</>}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Name"
          variant="outlined"
          error={Boolean(errors.fullName?.message)}
          sx={{ bgcolor: 'white', borderRadius: '8px' }}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите имя' })}
          fullWidth
        />
        <TextField
          type="email"
          className={styles.field}
          label="Email"
          variant="outlined"
          error={Boolean(errors.email?.message)}
          sx={{ bgcolor: 'white', borderRadius: '8px' }}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          variant="outlined"
          error={Boolean(errors.password?.message)}
          sx={{ bgcolor: 'white', borderRadius: '8px' }}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth
        />
        <Typography sx={{ marginBottom: 2, color }}>
          {isEn ? (
            <>
              If you already have an account, please&nbsp;
              <Link className={styles.link} to="/register">
                login
              </Link>
            </>
          ) : (
            <>
              Если у вас уже есть аккаунт,&nbsp;
              <Link className={styles.link} to="/login">
                войдите
              </Link>
            </>
          )}
        </Typography>
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          {isEn ? <>Sign up</> : <>Зарегистрироваться</>}
        </Button>
      </form>
    </div>
  );
}

export default Register;
