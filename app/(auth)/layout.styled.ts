import styled from 'styled-components';

export const AuthLayoutContainer = styled.main`
  /* position: relative; */
  display: grid;
  min-height: 100vh;
  grid-template-columns: 2fr 3fr;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    align-items: flex-start;

    /* > *:first-child {
      display: none;
    } */
  }
`;
