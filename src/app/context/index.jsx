import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext('app');

const staticTheme = {
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

const dark = {
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
}

const light = {
  colors: {
    paper: {
      primary: '#fafafa',
      secondary: '#C9C9C9',
    },
    main: '#F39237',
    secondary: '#BF1363',
    success: '#0E79B2',
    warning: '#BD632F',
    text: '#1b1b1b',
    text2: '#2b2b2b',
  },
}

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    ...dark,
    ...staticTheme
  });
  const [colorsTheme, setColorsTheme] = useState('dark');
  const toggleTheme = () => {
    if (colorsTheme === 'dark') {
      setColorsTheme('light');
    } else {
      setColorsTheme('dark');
    }
  }

  useEffect(() => {
    if (colorsTheme === 'dark') {
      setTheme({
        ...dark,
        ...staticTheme
      });
    } else {
      setTheme({
        ...light,
        ...staticTheme
      });
    }
  }, [colorsTheme]);

  return (
    <AppContext.Provider
      value={{ theme, toggleTheme, colorsTheme }}
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
