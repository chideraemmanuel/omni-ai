import styled from 'styled-components';

export const DashboardContainer = styled.div`
  /* background-color: red; */
  width: 100%;
  max-width: 1000px;
`;

export const DashboardHeader = styled.div`
  /* background-color: red; */
  padding: ${({ theme }) =>
    `${theme.space['fluid-block-space-7']} ${theme.space['fluid-inline-space-7']}`};

  h2 {
    font-size: ${({ theme }) => theme.font['lg-font']};
    font-weight: bold;
    padding-bottom: ${({ theme }) => theme.space['fluid-block-space-2']};
  }

  p {
    font-size: ${({ theme }) => theme.font['sm-font']};
    color: ${({ theme }) => theme.colors.light['gray-600']};
  }
`;

export const DashboardLinks = styled.div`
  padding: ${({ theme }) =>
    `${theme.space['fluid-block-space-5']} ${theme.space['fluid-inline-space-5']}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['fluid-block-space-5']};
`;
