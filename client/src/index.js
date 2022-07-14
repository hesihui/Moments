import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';


ReactDOM.render(
        <App />,
    document.getElementById('root'),
);