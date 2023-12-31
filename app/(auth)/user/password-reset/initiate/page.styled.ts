import styled from 'styled-components';

export const PasswordResetInitiationPageContainer = styled.div`
  /* background-color: red; */
  /* height: 100%; */
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) =>
    `${theme.space['fluid-block-space-15']} ${theme.space['fluid-inline-space-15']}`};

  @media screen and (max-width: 768px) {
    padding: ${({ theme }) =>
      `${theme.space['fluid-block-space-7']} ${theme.space['fluid-inline-space-7']}`};
  }
`;

export const PasswordResetInitiationFormContainer = styled.div`
  /* background-color: blue; */
  width: min(90%, 600px);
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    /* background-color: red; */
    width: min(90%, 500px);
    padding: ${({ theme }) => `${theme.space['fluid-block-space-7']} 0`};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space['fluid-block-space-4']};
  }
`;

export const PasswordResetInitiationFormHeader = styled.div`
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
