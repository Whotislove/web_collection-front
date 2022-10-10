import React from 'react';
import { TextField, Button } from '@mui/material';
import styles from './Register.module.scss';
function Register() {
  return (
    <div className={styles.root}>
      <TextField
        className={styles.field}
        label="Name"
        variant="outlined"
        // error={Boolean(errors.email?.message)}
        // helperText={errors.email?.message}
        // {...register('email', { required: 'Укажите почту' })}
        fullWidth
      />
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

export default Register;
