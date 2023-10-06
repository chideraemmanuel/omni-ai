import styled from 'styled-components';

export const ImageCardContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.light['gray-400']};
  border-radius: 5px;
`;

export const CardImage = styled.div`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  img {
    border-radius: inherit;
    width: 100%;
    height: 100%;
  }
`;

export const ImageDownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: var(--gray-300);
  color: #171717;
  border: none;
  font-size: var(--base-font);
  font-size: var(--sm-font);
  font-weight: 600;
  width: 100%;
  padding: max(0.7vw, 10px);
  cursor: pointer;
  border-radius: 5px;
  transition: 0.2s ease;
`;
