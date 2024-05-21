import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import Layout from "./components/auth/Layout";
import SignUp from "./components/auth/SignUp";
import MainPage from './components/auth/MainPage';
import Test1 from './components/Tests/Test1';
import Test2 from './components/Tests/Test2';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="mainpage" element={<MainPage />} />
          <Route path="taketest1" element={<Test1/>} />
          <Route path="taketest2" element={<Test2/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);