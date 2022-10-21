import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import styles from './Register.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from '../../axios';
import { addUserInfo } from '../../redux/slices/user';
function Register() {
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
  return (
    <div className={styles.root}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Name"
          variant="outlined"
          error={Boolean(errors.fullName?.message)}
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
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          variant="outlined"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth
        />
        <Button disablde={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </div>
  );
}

export default Register;
