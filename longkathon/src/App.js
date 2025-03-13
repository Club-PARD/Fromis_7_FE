import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LenderPage from "./pages/Land.js";
import PiecePage from "./pages/PiecePage.js";
import DetailPage from "./pages/Detail.js";
import EmptyMainPage from "./pages/EmptyMain.js";
import CategoryPage from "./pages/CategoryPage.js";
import MyInfoPage from "./pages/MyInfoPage.js";
import MainPage from "./pages/MainPage.js";
import HistoryPage from "./pages/History.js";
import Register from "./pages/Register.js";
import LoginPage from "./pages/Login.js";
import AddCategory from "./pages/AddCategory.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LenderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        <Route path="/:userId/main" element={<MainPage />} />
        <Route path="/:userId/emptymain" element={<EmptyMainPage />} />
        <Route path="/:userId/main/:pieceId" element={<PiecePage />} />
        <Route path="/addcategory" element={<AddCategory />} />

        <Route
          path="/main/:pieceId/category/:listId"
          element={<DetailPage />}
        />
        <Route
          path="/:userId/main/:pieceId/category"
          element={<CategoryPage />}
        />
        <Route path="/mypage" element={<MyInfoPage />} />
        {/* <Route path="/:userId/history" element={<HistoryPage />} /> */}
        {/* <Route path="/practice" element={<FetchPractice />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
