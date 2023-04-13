import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {WeatherStore} from "./context/WeatherContext.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Page1 from './components/Page1';
import Page2 from './components/Page2'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
        <WeatherStore>
    <Router>
      <Routes>
        <Route exact path="/" element={ <Page1/>} />
        <Route path="/Page2" element={ <Page2/>} />
      </Routes>
    </Router>
    </WeatherStore>
  </React.StrictMode>
);

