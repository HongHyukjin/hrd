import React from 'react';
import ReactDOM from 'react-dom/client';
import WrapComponent from './components/WrapComponent';
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <WrapComponent />
  </React.StrictMode>
);

