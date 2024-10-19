import React from 'react';
import ReactDOM from 'react-dom/client'; // Importar createRoot
import './index.css';
import App from './components/App'; 

const root = ReactDOM.createRoot(document.getElementById('root')); // Usar createRoot
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
