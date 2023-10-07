import styled from 'styled-components';

export const FullScreenLoaderContainer = styled.div`
  position: fixed;
  inset: 0;
  //   width: 100vw;
  //   height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);

  svg {
    animation: rotate 2s infinite linear;
    width: ${({ theme }) => theme.space['fluid-inline-space-15']} !important;
    aspect-ratio: 1 / 1;
  }

  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;
