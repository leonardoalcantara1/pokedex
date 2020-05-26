import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconButton
} from '@material-ui/core';
import {
  ColorLens
} from '@material-ui/icons';

import { withContext } from 'app/context';
import { Styled } from './styles';

const Header = ({ context }) => <Styled>
  <Link to="/">
    <img src="/logo.png" alt="" />
  </Link>
  <IconButton onClick={context.toggleTheme}>
    <ColorLens />
  </IconButton>
</Styled>;

export default withContext(Header);