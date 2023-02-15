import { Routes, Route} from 'react-router-dom';
import React from 'react';
import './styles/app.css';
import './styles/pages/games.css';
import Url from './pages/Url';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/url" element={ <Url /> } />
    </Routes>
  );
}

export default App;
