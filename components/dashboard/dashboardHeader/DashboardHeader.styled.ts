import styled, { css } from 'styled-components';

export const DashboardHeaderContainer = styled.div`
  background-color: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.light['gray-200']};
  height: ${({ theme }) => theme.space['fluid-block-space-17']};
  /* position: sticky;
  top: 0; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ theme }) => `0 ${theme.space['fluid-inline-space-3']}`};

  @media screen and (max-width: 820px) {
    justify-content: space-between;
  }
`;

interface HeaderLinkProps {
  $active: boolean;
}

export const DashboardHeaderUserButton = styled.div<HeaderLinkProps>`
  position: relative;
  display: inline-block;

  > button {
    width: ${({ theme }) => theme.space['fluid-inline-space-9']};
    aspect-ratio: 1 / 1;
    background-color: transparent;
    border-radius: 50%;
    border: none;
    cursor: pointer;

    img {
      border-radius: inherit;
      width: 100%;
      height: 100%;
    }
  }

  > div:last-child {
    position: absolute;
    right: 0;
    top: 100%;
    background-color: #fff;
    width: max(30vw, 270px);
    max-width: 300px;
    padding: 10px 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    opacity: 0;
    visibility: hidden;
    transition: 0.3s ease;
    z-index: 7;

    ${({ $active }) =>
      $active &&
      css`
        opacity: 1;
        visibility: visible;
        top: 120%;
      `}

    li {
      list-style: none;

      button {
        cursor: pointer;
        background-color: transparent;
        border: none;
        width: 100%;
        text-align: start;
      }

      a,
      button {
        display: block;
        padding: 10px;
        /* border: 1px solid red; */
        font-size: ${({ theme }) => theme.font['sm-font']};
        border-radius: 5px;

        &:hover {
          background: #f9fafb;
        }
      }
    }
  }
`;

// export const UserButtonOverlay = styled.div`
//   /* display: none; */
//   position: fixed;
//   inset: 0;
//   width: 100vw;
//   height: 100vh;
//   background-color: transparent;
// `;

export const DashboardHeaderLogo = styled.div`
  display: none;

  @media screen and (max-width: 820px) {
    display: inline-block;
  }
`;

export const DashboardHeaderMobileToggle = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  font-size: ${({ theme }) => theme.font['lg-font']};
  color: ${({ theme }) => theme.colors.light['gray-700']};
  display: none;

  @media screen and (max-width: 820px) {
    display: inline-block;
  }
`;
