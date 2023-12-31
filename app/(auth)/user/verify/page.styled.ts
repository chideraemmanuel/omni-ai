import styled from 'styled-components';

export const VerificationPageContainer = styled.div`
  /* height: 100%;
  width: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) =>
    `${theme.space['fluid-block-space-15']} ${theme.space['fluid-inline-space-15']}`};
`;

export const VerificationFormContainer = styled.div`
  /* background-color: blue; */
  width: min(90%, 600px);
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    /* background-color: red; */
    width: min(90%, 350px);
    padding: ${({ theme }) => `${theme.space['fluid-block-space-7']} 0`};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space['fluid-block-space-4']};
  }

  > p:last-child {
    padding-bottom: ${({ theme }) => theme.space['fluid-block-space-2']};
    color: ${({ theme }) => theme.colors.light['gray-700']};
    font-size: ${({ theme }) =>
      theme.font['sm-font'] || 'clamp(0.875rem, 0.831rem + 0.1878vw, 1rem)'};

    span {
      color: blue;
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export const VerificationFormHeader = styled.div`
  text-align: center;

  h2 {
    padding-bottom: ${({ theme }) => theme.space['fluid-block-space-2']};
    font-weight: bold;
    display: inline-block;
    font-size: ${({ theme }) =>
      theme.font['md-font'] || 'clamp(1.25rem, 1.14rem + 0.4695vw, 1.5625rem)'};

    @media screen and (max-width: 768px) {
      font-size: ${({ theme }) =>
        theme.font['lg-font'] ||
        'clamp(1.5625rem, 1.3644rem + 0.8451vw, 2.125rem)'};
    }
  }

  p {
    padding-bottom: ${({ theme }) => theme.space['fluid-block-space-2']};
    /* color: #ebebeb; */
    color: ${({ theme }) => theme.colors.light['gray-700']};
    font-size: ${({ theme }) =>
      theme.font['sm-font'] || 'clamp(0.875rem, 0.831rem + 0.1878vw, 1rem)'};

    a {
      /* color: var(--primary-color); */
      color: inherit;
      text-decoration: underline;
    }
  }
`;
