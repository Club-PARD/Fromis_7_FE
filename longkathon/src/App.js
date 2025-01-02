import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LenderPage from './pages/Land.js';
import LoginNoGoogle from './pages/Login.js';
import MainPage from './pages/MainPage.js';
import DetailPage from './pages/Detail.js';
import EmptyMainPage from './pages/EmptyMain.js';
import AllCategoryPage from './pages/AllCategoryPage.js';
import MyInfoPage from './pages/MyInfoPage.js';
import AddCategory from './pages/AddCategory.js';
import AllPiecePage from './pages/AllPiecePage.js';
import HistoryPage from './pages/History.js';
import Register from "./pages/Register.js";

function App() {
  return (
     // const [isModalOpen, setIsModalOpen] = useState(true);

  // const handleSave = (data) => {
  //     console.log("저장 데이터:", data);
  //     setIsModalOpen(false);
  // };

  // const handleClose = () => {
  //     setIsModalOpen(false);
  // };

    <>
      {/* 상단의 AddCategory 컴포넌트 */}

      {/* 라우팅 설정 */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LenderPage />} />
          {/* nogoogle page랑 연결됨. */}
          <Route path="/login" element={<LoginNoGoogle />} /> 
          <Route path="/main" element={<MainPage />} />
          <Route path="/emptymain" element={<EmptyMainPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/category" element={<AllCategoryPage Title={"input_title"} />} />
          <Route path="/mypage" element={<MyInfoPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
