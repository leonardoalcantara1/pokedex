import styled from 'styled-components';
import { withContext } from 'app/utils/context';

export const UtilAreaComponent = withContext(
  styled.section`
    margin-top: ${({ context }) => context.theme.dimensions.headerHeight};
    background: ${({ context }) => context.theme.colors.paper.secondary};
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 16px;
    min-height: ${({ context }) => `calc(100vh - ${context.theme.dimensions.headerHeight})`};
    box-sizing: border-box;
    @media (max-width: ${({ context }) => context.theme.breakpoints.md - 1}px) {
      padding: 0;
      margin-top: 0;
      min-height: initial;
    }
  `,
);

export const Wrapper = withContext(
  styled.div`
    width: 100%;
    max-width: ${({ context }) => context.theme.dimensions.utilArea};
    padding: 0 16px;
  `,
);
