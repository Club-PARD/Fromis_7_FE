import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LenderPage from './pages/Land.js';
import LoginPage from './pages/Login.js';
import MainPage from './pages/MainPage.js';
import DetailPage from './pages/Detail.js';
import EmptyMainPage from './pages/EmptyMain.js';
import AllCategoryPage from './pages/AllCategoryPage.js';
import ModalAdd from './components/ModalAdd.js';
import MyInfoPage from './pages/MyInfoPage.js';


function App() {

  // const [isModalOpen, setIsModalOpen] = useState(true);

  // const handleSave = (data) => {
  //     console.log("저장 데이터:", data);
  //     setIsModalOpen(false);
  // };

  // const handleClose = () => {
  //     setIsModalOpen(false);
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LenderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/emptymain" element={<EmptyMainPage/>} />
        <Route path="/detail" element={<DetailPage/>} />
        <Route path="/category" element={<AllCategoryPage  Title={"input_title"}/>} />
        <Route path="/myinfo" element={<MyInfoPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
