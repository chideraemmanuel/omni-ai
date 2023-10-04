import styled from 'styled-components';

export const DashboardMobileMenuOverlay = styled.div`
  z-index: 5;
  display: none;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: saturate(180%) blur(7px);

  @media screen and (max-width: 820px) {
    display: block;
  }
`;

interface ContainerProps {
  menuActive: boolean;
}

export const DashboardMobileMenuContainer = styled.div<ContainerProps>`
  z-index: 7;
  background-color: ${({ theme }) => theme.colors['secondary-color']};
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  /* left: -100%; */
  left: ${({ menuActive }) => (menuActive ? '0' : '-100%')};
  width: 50vw;
  transition: 0.3s ease;

  @media screen and (max-width: 820px) {
    display: block;
  }

  @media screen and (max-width: 540px) {
    width: 65vw;
  }
`;

export const DashboardMobileMenuHeader = styled.div`
  height: ${({ theme }) => theme.space['fluid-block-space-19']};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `0 ${theme.space['fluid-inline-space-3']}`};

  button {
    font-size: ${({ theme }) => theme.font['lg-font']};
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.light['gray-500']};
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.light['gray-500']};
    cursor: pointer;
  }
`;

export const MobileMenuLinks = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['fluid-block-space-3']};
  padding: ${({ theme }) =>
    `${theme.space['fluid-block-space-3']} ${theme.space['fluid-inline-space-3']}`};
  overflow: scroll;
  overflow-x: hidden;
  height: 90%;

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
      color: ${({ theme }) => theme.colors.light['gray-400']};
    }

    > ul {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space['fluid-block-space-1']};

      a {
        /* background-color: blue; */
        display: block;
        font-size: ${({ theme }) => theme.font['sm-font']};
        padding: ${({ theme }) =>
          `${theme.space['fluid-block-space-3']} ${theme.space['fluid-inline-space-3']}`};
        border-radius: 0.5rem;
        color: ${({ theme }) => theme.colors.light['gray-700']};
        transition: 0.2s ease;

        &:hover {
          /* background-color: #dee8f8; */
          background-color: rgba(181, 207, 248, 0.5);
          color: ${({ theme }) => theme.colors['primary-color']};
        }

        &.active {
          background-color: rgba(181, 207, 248, 0.5);
          color: ${({ theme }) => theme.colors['primary-color']};
        }
      }
    }
  }
`;
