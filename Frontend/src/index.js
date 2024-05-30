import './App.css';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="104904990675-fcnmsj8l538om09mekdno3bij7pvo0g9.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
