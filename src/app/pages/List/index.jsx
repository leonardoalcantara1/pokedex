import React, { useState, useEffect, createRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  TextField,
  InputAdornment,
  Grid,
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core';
import {
  Search
} from '@material-ui/icons';

import { withContext } from 'app/context';
import { withContext as withPokeCtx } from 'app/context/poke';
import { getPokemons } from './services';

const InfiniteScroll = createRef();

const List = ({ context, pokeCtx, history }) => {
  const { spacing } = context.theme.dimensions;
  const { findPokemon } = pokeCtx;
  const [pokemons, setPokemons] = useState();
  const [pokeLoading, setPokeLoading] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(window.innerHeight);
  const [scroll, setScroll] = useState(window.scrollY);

  const functionGetPokemons = async () => {
    setPokeLoading(true);
    try {
      const data = await getPokemons(pokemons?.next);
      setPokemons(pokemons ? { ...data, results: [...pokemons.results, ...data.results] } : data);
    } catch(e) {
      setPokemons(null);
    }
    setPokeLoading(false);
  }

  const verifyScroll = (loading = pokeLoading, next = pokemons?.next) => {
    if (!loading && (scroll + bodyHeight) > InfiniteScroll?.current.offsetTop && next) {
      functionGetPokemons();
    }
  }

  const searchDebounce = (() => {
		let time;
		return (query) => {
			clearTimeout(time);
			time = setTimeout(async () => {
        if (query) {
          const pk = await findPokemon(query);
          if (pk) {
            history.push(`/pokemon/${query}`);
          }
        }
			}, 1000)
		}
	})()

  useEffect(() => {
    functionGetPokemons();
    window.onscroll = () => {
      setScroll(window.scrollY);
    }
    window.onresize = () => {
      setBodyHeight(window.innerHeight);
    }
  }, []);
  
  useEffect(() => {
    verifyScroll();
  }, [bodyHeight, pokeLoading, pokemons, scroll]);

  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Procure por nome"
        InputProps={{
          endAdornment: <InputAdornment position="end"><Search color="primary" /></InputAdornment>
        }}
        onChange={e => searchDebounce(e.target.value)}
      />
      <Grid container spacing={2} style={{ marginTop: spacing }}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Lista
          </Typography>
        </Grid>
        {
          pokemons?.results?.map((pk, i) => (
            <Grid item xs={12} md={4} key={pk.name}>
              <Button
                component={Link}
                to={`/pokemon/${pk.name}`}
                style={{ width: '100%' }}
                variant="outlined"
              >
                #{i + 1} {pk.name}
              </Button>
            </Grid>
          ))
        }
        <div ref={InfiniteScroll} />
        {
          pokeLoading && (
            <Grid item container xs={12} style={{ justifyContent: 'center' }}>
              <CircularProgress color="primary" />
            </Grid>
          )
        }
      </Grid>
    </>
  )
}

export default withContext(withPokeCtx(withRouter(List)));
