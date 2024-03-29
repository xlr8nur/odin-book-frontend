import React from 'react';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import { ProvideAuth } from './useAuth';

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <HashRouter>
        <App />
      </HashRouter>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root'),
);