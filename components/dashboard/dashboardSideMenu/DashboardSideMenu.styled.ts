import styled from 'styled-components';

export const DashboardSideMenuContainer = styled.aside`
  /* background-color: red; */
  background-color: ${({ theme }) => theme.colors['secondary-color']};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: min(270px, 30vw);

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

export const SideMenuLogo = styled.div`
  height: ${({ theme }) => theme.space['fluid-block-space-19']};
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `0 ${theme.space['fluid-inline-space-3']}`};
`;

export const SideMenuLinks = styled.div`
  /* background-color: red; */
  /* height: 100%; */
  overflow: scroll;
  overflow-x: hidden;
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['fluid-block-space-3']};
  padding: ${({ theme }) =>
    `${theme.space['fluid-block-space-3']} ${theme.space['fluid-inline-space-3']}`};

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
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space['fluid-block-space-2']};

    > span {
      font-size: ${({ theme }) => theme.font['xs-font']};
      color: ${({ theme }) => theme.colors.light['gray-800']};
    }

    > ul {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space['fluid-block-space-1']};

      li {
        list-style: none;
      }
    }
  }
`;
