import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import './pages/Home/index.css';


ReactDOM.render(
  <React.StrictMode>
    < Header />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
