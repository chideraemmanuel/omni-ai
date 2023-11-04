import styled from 'styled-components';

export const AuthShowcaseContainer = styled.div`
  /* background-color: teal; */
  display: flex;
  flex-direction: column;
  position: relative;

  .overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    inset: 0;

    @media screen and (max-width: 768px) {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

export const AuthShowcaseLogo = styled.div`
  z-index: 10;
  height: ${({ theme }) => theme.space['fluid-block-space-19']};
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `0 ${theme.space['fluid-inline-space-3']}`};
`;

export const AuthShowcaseText = styled.div`
  z-index: 10;
  flex: 1;
  /* background-color: red; */
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 768px) {
    display: none;
  }

  h3 {
    color: ${({ theme }) => theme.colors.light['gray-100']};
    font-size: ${({ theme }) => theme.font['lg-font']};
    padding-bottom: ${({ theme }) => theme.space['fluid-block-space-3']};
  }

  p {
    color: ${({ theme }) => theme.colors.light['gray-300']};
    font-size: ${({ theme }) => theme.font['sm-font']};
  }
`;
