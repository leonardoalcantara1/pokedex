import styled from 'styled-components';
import { withContext } from 'app/utils/context';

export const Styled = withContext(styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ context }) => context.theme.dimensions.headerHeight};
  img {
    max-height: 60px;
  }
`);