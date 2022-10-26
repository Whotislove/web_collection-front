import { Container } from '@mui/material';
import { Route, Routes } from 'react-router';

import './App.scss';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import MyCollection from './pages/MyCollection/MyCollection';
import Home from './pages/Home/Home';
import Collection from './pages/Collection/Collection';
import Item from './pages/Item/Item';
import { useDispatch } from 'react-redux';
import { addUserInfo } from './redux/slices/user';
import React from 'react';
import axios from './axios';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    async function getMe() {
      const { data } = await axios.get('/me');
      dispatch(addUserInfo(data));
    }
    getMe();
  });
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ bgcolor: 'white', marginTop: '10px', borderRadius: '8px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="mycollection" element={<MyCollection />} />
          <Route path="collection/:id" element={<Collection />} />
          <Route path="collection/:collectionId/item/:itemId" element={<Item />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
