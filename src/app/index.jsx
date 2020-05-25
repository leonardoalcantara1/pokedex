import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';

import { withContext } from 'app/utils/context';

import Header from 'app/components/Header';

const App = ({ context }) => {
  const { theme: ctxTheme } = context;
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: ctxTheme.colors.main,
      },
      secondary: {
        main: ctxTheme.colors.secondary,
      },
      success: {
        main: ctxTheme.colors.success,
      },
      warning: {
        main: ctxTheme.colors.warning,
      },
      text: {
        primary: ctxTheme.colors.text,
      },
    },
    typography: {
      htmlFontSize: +(ctxTheme.font.size.replace('px', '')),
      fontFamily: ctxTheme.font.family,
    },
  });

  const GlobalStyle = createGlobalStyle`
    body {
      font-family: ${ctxTheme.font.family};
      background: ${ctxTheme.colors.paper.primary};
      margin: 0;
      @media (max-width: ${ctxTheme.breakpoints.md - 1}px) {
        background: ${ctxTheme.colors.paper.primary};
      }
    }
  `;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle context={context} />
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default withContext(App);
