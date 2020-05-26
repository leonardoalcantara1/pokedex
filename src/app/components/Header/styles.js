import styled from 'styled-components';
import { withContext } from 'app/context';

export const Styled = withContext(styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: ${({ context }) => context.theme.dimensions.headerHeight};
  img {
    max-height: 60px;
  }
  button {
    position: absolute;
    right: 8px;
  }
`);