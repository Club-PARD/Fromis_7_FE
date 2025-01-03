import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LenderPage from './pages/Land.js';
import MainPage from './pages/MainPage.js';
import DetailPage from './pages/Detail.js';
import EmptyMainPage from './pages/EmptyMain.js';
import AllCategoryPage from './pages/AllCategoryPage.js';
import MyInfoPage from './pages/MyInfoPage.js';
import AddCategory from './pages/AddCategory.js';
import AllPiecePage from './pages/AllPiecePage.js';
import HistoryPage from './pages/History.js';
import RegisterPage from "./pages/Register.js";
import LoginPage from './pages/Login.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LenderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main/:pieceId" element={<MainPage />} />
        <Route path="/emptymain" element={<EmptyMainPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/piece/:pieceIdCategory/category" element={<AllCategoryPage />} />
        <Route path="/mypage" element={<MyInfoPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/piece" element={<AllPiecePage />} />
      </Routes>
    </BrowserRouter>

  );
}
export default App;
