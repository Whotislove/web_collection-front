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

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ bgcolor: 'white', marginTop: '10px', borderRadius: '8px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="mycollection" element={<MyCollection />} />
          <Route path="collection" element={<Collection />} />
          <Route path="item/:id" element={<Item />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
