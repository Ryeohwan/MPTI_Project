import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));

const abc = (e) => {
  (console.log(e)).then(() => {
    console.log(1)
  })
}
abc()
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
