import styled from 'styled-components';

export const RegistrationPageContainer = styled.section`
  /* background-color: green; */
  // position: absolute;
  // inset: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
`;

export const RegistrationPageFormContainer = styled.div`
  /* background-color: blue; */
  width: min(90%, 600px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RegistrationFormHeader = styled.div`
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

export const RegistrationForm = styled.div`
  /* background-color: red; */
  padding: ${({ theme }) =>
    `${theme.space['fluid-block-space-5']} ${theme.space['fluid-block-space-5']}`};
  border-radius: 10px;
  /* width: min(90%, 600px); */
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['fluid-block-space-5']};

  form {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space['fluid-block-space-2']};
  }
`;

export const RegistrationFormBreak = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  align-items: center;
  gap: 5px;
  grid-template-columns: 1fr auto 1fr;

  span {
    font-size: ${({ theme }) => theme.font['sm-font']};
    color: ${({ theme }) => theme.colors.light['gray-700']};
    /* text-align: center;
    display: flex;
    justify-content: center; */
  }

  div {
    /* position: absolute; */
    height: 1px;
    background-color: ${({ theme }) => theme.colors.light['gray-500']};
  }

  div:first-child {
  }

  div:last-child {
  }
`;
