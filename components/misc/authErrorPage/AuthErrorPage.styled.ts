import styled from 'styled-components';

export const PageContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: #fff;
  z-index: 15;
  //   background-color: red;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  height: ${({ theme }) => theme.space['fluid-block-space-19']};
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `0 ${theme.space['fluid-inline-space-3']}`};
`;

export const ContentContainer = styled.div`
  text-align: center;
  max-height: 80vh;
  padding: ${({ theme }) => `0 ${theme.space['fluid-inline-space-7']}`};

  .image {
    width: min(80vw, 500px);
    margin: 0 auto;
    padding-bottom: ${({ theme }) => theme.space['fluid-block-space-7']};
    /* background-color: blue; */

    img {
      height: 100%;
      width: 100%;
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.space['fluid-inline-space-3']};

    h2 {
      font-size: ${({ theme }) => theme.font['lg-font']};
      font-weight: bold;
    }

    p {
      font-size: ${({ theme }) => theme.font['base-font']};
      width: min(90%, 900px);
      padding-bottom: ${({ theme }) => theme.space['fluid-block-space-3']};
    }
  }
`;
