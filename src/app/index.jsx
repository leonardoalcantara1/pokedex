import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';

import { withContext } from 'app/context';
import Header from 'app/components/Header';
import UtilArea from 'app/components/UtilArea';

import List from 'app/pages/List';
import Pokemon from 'app/pages/Pokemon';

import { PokeProvider } from 'app/context/poke';

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
      color: ${ctxTheme.colors.text};
      @media (max-width: ${ctxTheme.breakpoints.md - 1}px) {
        font-size: ${ctxTheme.font.mobileSize};
      }
    }
  `;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle context={context} />
      <BrowserRouter>
        <Header />
        <UtilArea>
          <PokeProvider>
            <Switch>
              <Route path="/" exact component={List} />
              <Route path="/pokemon/:query" exact component={Pokemon} />
              <Route render={() => <Redirect to={{pathname: "/"}} />} />
            </Switch>
          </PokeProvider>
        </UtilArea>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default withContext(App);
