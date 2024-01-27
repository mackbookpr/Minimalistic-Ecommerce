import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { LightTheme, DarkTheme } from './Styles/Theme';

const ThemeWrapper = ({ children }) => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
