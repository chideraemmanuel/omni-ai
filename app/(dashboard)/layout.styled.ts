import styled from 'styled-components';

export const DashboardLayoutContainer = styled.div`
  > *:nth-child(2) {
    margin-left: min(270px, 30vw);

    @media screen and (max-width: 820px) {
      margin-left: 0;
    }
  }
`;

export const DashboardLayoutContent = styled.main`
  /* background-color: red; */
  height: 100vh;

  > *:nth-child(2) {
  }

  section {
    /* background-color: green; */
    /* padding: ${({ theme }) =>
      `${theme.space['fluid-block-space-5']} ${theme.space['fluid-inline-space-5']}`}; */
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    /* height: 100%; */
    height: calc(100% - ${({ theme }) => theme.space['fluid-block-space-17']});

    > * {
      background-color: ${({ theme }) => theme.colors.light['gray-100']};
      /* background-color: blue; */
      /* width: 100%;
      height: 100%; */
      /* overflow: scroll;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        width: 5px;
        opacity: 0;
        transition: 0.5s ease;
      }

      &:hover {
        &::-webkit-scrollbar {
          opacity: 1;
        }

        &::-webkit-scrollbar-track {
          background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
          background-color: ${({ theme }) => theme.colors.light['gray-700']};
        }
      } */
    }
  }
`;
