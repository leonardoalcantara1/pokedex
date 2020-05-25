import React from 'react';
import { Link } from 'react-router-dom';
import { Styled } from './styles';

const Header = () => <Styled>
  <Link to="/">
    <img src="/logo.png" alt="" />
  </Link>
</Styled>;

export default Header;