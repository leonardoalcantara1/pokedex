import React, { createContext, useState } from 'react';
import { get } from 'axios';
import {
  Snackbar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const AppContext = createContext('poke');

export const PokeProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState();
  const [pokeLoading, setPokeLoading] = useState(false);
  const [findError, setFindError] = useState();
  const findPokemon = async query => {
    setPokeLoading(true);
    setFindError(null);
    try {
      const data = await get(`https://pokeapi.co/api/v2/pokemon/${query}`);
      setPokemon(data.data);
      return data.data;
    } catch(e) {
      setFindError('Não foi possível encontrar o pokemon');
      setPokemon(null);
      return null;
    } finally {
      setPokeLoading(false);
    }
  };
  const clearPokemon = () => setPokemon(null);
  return (
    <AppContext.Provider
      value={{ pokemon, findPokemon, clearPokemon, pokeLoading, findError }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const withContext = (Component) => (props) => (
  <AppContext.Consumer>
    {
      state => <>
        {state.findError && (
          <Snackbar open autoHideDuration={6000}>
            <Alert severity="error">{state.findError}</Alert>
          </Snackbar>
        )}
        <Component {...props} pokeCtx={state} />
      </>
    }
  </AppContext.Consumer>
);
