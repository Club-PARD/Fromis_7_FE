import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LenderPage from './pages/Land.js';
import LoginPage from './pages/Login.js';
import MainPage from './pages/MainPage.js';
import DetailPage from './pages/Detail.js';
import EmptyMainPage from './pages/EmptyMain.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LenderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/emptymain" element={<EmptyMainPage/>} />
        <Route path="/detail" element={<DetailPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
