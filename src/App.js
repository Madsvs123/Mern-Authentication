import React from 'react';
import './public/assets/css/index.css'
import Auth from './pages/auth';
import Home from './pages/home'
import NotFound from './pages/NotFound.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector(state => state.user)
  const token = useSelector(state => state.token)
  const mainPage = () => {
    if (user && token) {
      return <Home />
    }
    return <Auth />
  }
  
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={mainPage()} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;