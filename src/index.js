import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Không cần import index.css cũ nữa nếu MUI quản lý hết baseline

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* ThemeProvider sẽ nằm trong App.js để dễ dàng chuyển đổi theme */}
  </React.StrictMode>
);