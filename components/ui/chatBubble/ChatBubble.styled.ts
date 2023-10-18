import styled from 'styled-components';

interface BubbleProps {
  $role: 'user' | 'assistant';
}

export const ChatBubbleContainer = styled.div<BubbleProps>`
  display: flex;
  flex-direction: column;
  /* justify-content: ${({ $role }) =>
    $role === 'user' ? 'flex-end' : 'flex-start'}; */
  align-items: ${({ $role }) => ($role === 'user' ? 'flex-end' : 'flex-start')};

  * {
    &::-webkit-scrollbar {
      height: 5px;
      /* opacity: 0; */
      transition: 0.5s ease;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.light['gray-700']};
    }
  }

  /* &:hover {
    &::-webkit-scrollbar {
      opacity: 1;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.light['gray-700']};
    }
  } */

  > p {
    background-color: ${({ theme, $role }) =>
      $role === 'user' ? theme.colors['primary-color'] : '#fff'};
    padding: ${({ theme }) =>
      `${theme.space['fluid-block-space-2']} ${theme.space['fluid-inline-space-4']}`};
    border-radius: 0.5rem;
    font-size: ${({ theme }) => theme.font['sm-font']};
    line-height: 170%;
    color: ${({ theme }) => theme.colors.light['gray-900']};
    max-width: 75%;
    box-shadow: 0px 0px 0px 4px #f4ebff 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

    ol {
      padding: ${({ theme }) =>
        `${theme.space['fluid-block-space-2']} ${theme.space['fluid-inline-space-4']}`};
    }
  }
`;
