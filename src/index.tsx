import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import 'flowbite';

ReactDOM.render(
  // <React.StrictMode>
    <Router >
      <App />
    </Router >,
  // </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
