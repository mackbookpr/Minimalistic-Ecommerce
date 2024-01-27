import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store/Store';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeWrapper from './ThemeWrapper';

const Root = () => (
  <Provider store={Store}>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

reportWebVitals();
