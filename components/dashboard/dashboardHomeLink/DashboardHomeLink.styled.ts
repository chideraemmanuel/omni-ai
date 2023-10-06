import styled from 'styled-components';

export const LinkContainer = styled.a`
  background-color: #fff;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space['fluid-inline-space-7']};
  padding: ${({ theme }) =>
    `${theme.space['fluid-block-space-5']} ${theme.space['fluid-inline-space-5']}`};
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.1);
  border: 1px solid #d0d5dd;
  /* box-shadow: 0px 0px 0px 3px #dee8f8; */
  transition: 0.2s ease;

  &:hover {
    box-shadow: 0px 0px 7px #b5cff8;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space['fluid-block-space-1']};

    h3 {
      font-size: ${({ theme }) => theme.font['md-font']};
      font-weight: bold;
    }

    p {
      font-size: ${({ theme }) => theme.font['sm-font']};
      color: ${({ theme }) => theme.colors.light['gray-600']};
    }
  }

  svg {
    font-size: ${({ theme }) => theme.font['base-font']};
    color: ${({ theme }) => theme.colors.light['gray-900']};
  }
`;
