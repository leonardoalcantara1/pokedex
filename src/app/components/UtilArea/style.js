import styled from 'styled-components';
import { withContext } from 'app/context';

export const UtilAreaComponent = withContext(
  styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 16px;
    box-sizing: border-box;
  `,
);

export const Wrapper = withContext(
  styled.div`
    width: 100%;
    max-width: ${({ context }) => context.theme.dimensions.utilArea};
    padding: 0 16px;
  `,
);
