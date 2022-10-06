import { Container } from '@mui/material';
import { Route, Routes } from 'react-router';

import './App.scss';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Collection from './pages/Collection/Collection';
import Home from './pages/Home/Home';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ bgcolor: 'white' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mycollection" element={<Collection />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
