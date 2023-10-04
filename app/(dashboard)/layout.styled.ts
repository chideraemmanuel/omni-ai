import styled from 'styled-components';

export const DashboardLayoutContainer = styled.div`
  > *:nth-child(2) {
    margin-left: min(270px, 30vw);

    @media screen and (max-width: 820px) {
      margin-left: 0;
    }
  }
`;

export const DashboardLayoutContent = styled.main``;
