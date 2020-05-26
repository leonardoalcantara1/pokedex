import React, { createContext, useState } from 'react';

const AppContext = createContext('app');

const darkTheme = {
  colors: {
    paper: {
      primary: '#1b1b1b',
      secondary: '#2b2b2b',
    },
    main: '#FFD670',
    secondary: '#FF70A6',
    success: '#70D6FF',
    warning: '#FF9770',
    text: '#fafafa',
    text2: '#C9C9C9',
  },
  font: {
    family: "'Balsamiq Sans', cursive",
    size: '16px',
  },
  dimensions: {
    headerHeight: '90px',
    utilArea: '800px',
    spacing: '8px',
  },
  breakpoints: {
    lg: 1280,
    md: 960,
    sm: 600,
  },
};

export const AppProvider = ({ children }) => {
  const [theme] = useState(darkTheme);
  return (
    <AppContext.Provider
      value={{ theme }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const withContext = (Component) => (props) => (
  <AppContext.Consumer>
    {state => <Component {...props} context={state} />}
  </AppContext.Consumer>
);
