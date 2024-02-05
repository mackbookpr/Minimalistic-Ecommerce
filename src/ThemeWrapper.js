import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { LightTheme, darkTheme } from './Styles/DarkTheme';

const ThemeWrapper = ({ children }) => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : LightTheme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;