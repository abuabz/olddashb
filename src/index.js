import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landingpage from './LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginPage from './components/LoginPage/Login';
import Dsr from './components/DSR/Dsr';
import { DarkModeProvider } from './components/Darktheme/DarkModeContext';
import Demo from './components/demo/demo';
import Demo2 from './components/demo/demo2';

ReactDOM.render(
  <DarkModeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/App" element={<App />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/DSR" element={<Dsr />} />
        <Route path="/details/IN" element={<Demo />} />
        <Route path="/details/KL" element={<Demo2 />} />

      </Routes>
    </Router>
  </DarkModeProvider>,
  document.getElementById('root')
);
