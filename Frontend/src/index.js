import './App.css';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./authContext";

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="104904990675-fcnmsj8l538om09mekdno3bij7pvo0g9.apps.googleusercontent.com">
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
