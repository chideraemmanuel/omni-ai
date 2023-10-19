import styled from 'styled-components';

export const StyledProfileImage = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.font['sm-font']};
  font-weight: bold;
`;
