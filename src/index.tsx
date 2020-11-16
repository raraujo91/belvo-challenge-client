import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './styles/global';
import { BrowserRouter as Router } from "react-router-dom";


import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);