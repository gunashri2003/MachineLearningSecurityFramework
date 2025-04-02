import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from './store/configureStore';
import './index.css';
import App from './App';

const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById("root")as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
);

