import React from 'react';
import { UtilAreaComponent, Wrapper } from './style';

const UtilArea = ({ children }) => (
  <UtilAreaComponent>
    <Wrapper>
      {children}
    </Wrapper>
  </UtilAreaComponent>
);

export default UtilArea;
