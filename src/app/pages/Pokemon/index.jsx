import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  IconButton,
  Typography,
  CircularProgress
} from '@material-ui/core';
import {
  Home
} from '@material-ui/icons';

import Breakpoint from 'app/components/Breakpoint';
import { withContext as withPokeCtx } from 'app/context/poke';
import { withContext } from 'app/context';

const Single = (props) => {
  const { pokemon, findPokemon, clearPokemon, pokeLoading } = props.pokeCtx;
  const { theme } = props.context;
  const { query } = props.match.params;
  
  useEffect(() => {
    if (!pokemon) {
      findPokemon(query);
    }
    return () => {
      clearPokemon();
    }
  }, [query]);

  return (
    pokeLoading ? (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress />
      </div>
    ) : pokemon ? (
      <Grid container spacing={2}>
        <Grid item container xs={12} style={{ alignItems: 'center' }} spacing={2}>
          <Grid item>
            <IconButton style={{ color: theme.colors.secondary }} component={Link} to="/">
              <Home />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              {pokemon?.name.toUpperCase()}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} style={{ alignItems: 'flex-start', justifyContent: 'center' }} spacing={4}>
          <Grid item>
            <Card variant="outlined">
              <img src={pokemon?.sprites.front_default} alt="" />
            </Card>
          </Grid>
          <Breakpoint sm>
            <Grid item xs={12} />
          </Breakpoint>
          <Grid item container xs spacing={2}>
            <Grid item container xs={12} spacing={2}>
              {
                pokemon?.types?.map(({ type }) => (
                  <Grid item key={type.name}>
                    <Typography variant="h6" style={{ color: theme.colors.warning }}>
                      {type.name}
                    </Typography>
                  </Grid>
                ))
              }
            </Grid>
            {
              pokemon?.stats?.map(stat => (
                <Grid item xs={6} key={stat.stat.name}>
                  <Typography variant="h5">
                    <span style={{ color: theme.colors.success }}>
                      {stat.stat.name}
                    </span>
                    {' '}
                    <span style={{ color: theme.colors.main }}>
                      {stat.base_stat}
                    </span>
                  </Typography>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    ) : ''
  )
}

export default withContext(withPokeCtx(Single));
