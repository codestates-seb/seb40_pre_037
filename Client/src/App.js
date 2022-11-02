import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardList from './pages/BoardList';
import BoardDetail from './pages/BoardDetail';
import BoardWrite from './pages/BoardWrite';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Nav from './components/Nav';
import LoginedNav from './components/LoginedNav';

function App() {
  const [login, setLogin] = useState(localStorage.getItem('login-token'));
  return (
    <>
      {login ? <LoginedNav setLogin={setLogin} /> : <Nav setLogin={setLogin} />}
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/detail" element={<BoardDetail />} />
        <Route path="/write" element={<BoardWrite />} />
        <Route path="/login" element={<LogIn setLogin={setLogin} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;

// Commit, PR 시 App.js 는 변동없이 위의 상태를 유지 부탁드립니다.
