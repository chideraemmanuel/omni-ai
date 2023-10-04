import styled from 'styled-components';

export const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['fluid-inline-space-2']};

  img {
  }

  span {
    font-size: ${({ theme }) => theme.font['md-font']};
    font-weight: bolder;
    color: #fff;
  }
`;
