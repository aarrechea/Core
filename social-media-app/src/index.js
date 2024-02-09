/* Imports */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';



/* Root application component */
const root = ReactDOM.createRoot(document.getElementById('root'));



/* Root render */
root.render(
    /* strict mode helps receiving warnings in the development mode */
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>    
    </React.StrictMode>
);


