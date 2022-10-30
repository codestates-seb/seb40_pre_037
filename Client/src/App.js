import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardList from './pages/BoardList';
import BoardDetail from './pages/BoardDetail';
import BoardWrite from './pages/BoardWrite';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Nav from './components/Nav';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/detail" element={<BoardDetail />} />
        <Route path="/write" element={<BoardWrite />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
  );
}

export default App;

// Commit, PR 시 App.js 는 변동없이 위의 상태를 유지 부탁드립니다.
