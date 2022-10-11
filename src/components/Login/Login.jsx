import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import styles from './Login.module.scss';
function Login() {
  return (
    <div className={styles.root}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <TextField
        type="email"
        className={styles.field}
        label="Email"
        variant="outlined"
        // error={Boolean(errors.email?.message)}
        // helperText={errors.email?.message}
        // {...register('email', { required: 'Укажите почту' })}
        fullWidth
      />
      <TextField
        className={styles.field}
        label="Password"
        variant="outlined"
        // error={Boolean(errors.password?.message)}
        // helperText={errors.password?.message}
        // {...register('password', { required: 'Укажите пароль' })}
        fullWidth
      />
      <Button type="submit" size="large" variant="contained" fullWidth>
        Войти
      </Button>
    </div>
  );
}

export default Login;
