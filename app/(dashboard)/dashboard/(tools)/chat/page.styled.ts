import styled from 'styled-components';

export const ChatContainer = styled.div`
  position: relative;
  width: min(900px, 100%);
  height: calc(100vh - ${({ theme }) => theme.space['fluid-block-space-17']});
  /* background-color: red; */
  background-color: ${({ theme }) => theme.colors.light['gray-100']};

  .notice {
    z-index: 5;
    background-color: #fff;
    padding: ${({ theme }) =>
      `${theme.space['fluid-block-space-3']} ${theme.space['fluid-inline-space-3']}`};
    border-radius: 0.5rem;
    width: min(700px, 90%);
    text-align: center;
    position: absolute;
    top: ${({ theme }) => theme.space['fluid-block-space-1']};
    left: 50%;
    transform: translateX(-50%);
    font-size: ${({ theme }) => theme.font['xs-font']};
  }
`;

export const ConversationContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['fluid-block-space-5']};

  width: 100%;
  height: 100%;
  padding: ${({ theme }) =>
    `${theme.space['fluid-block-space-5']} ${theme.space['fluid-inline-space-5']}`};
  padding-bottom: ${({ theme }) => theme.space['fluid-block-space-15']};
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 5px;
    opacity: 0;
    transition: 0.5s ease;
  }

  &:hover {
    &::-webkit-scrollbar {
      opacity: 1;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.light['gray-700']};
    }
  }
`;

export const InputContainer = styled.form`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  /* background-color: yellow; */
  /* width: 100%; */
  display: flex;

  input,
  textarea {
    flex: 1;
    outline: none;
    padding: ${({ theme }) =>
      `${theme.space['fluid-block-space-3']} ${theme.space['fluid-inline-space-3']}`};
    border: 1px solid ${({ theme }) => theme.colors.light['gray-700']};
    font-size: ${({ theme }) => theme.font['sm-font']};
    resize: none;
    height: ${({ theme }) => theme.space['fluid-block-space-12']};
    font-family: inherit;
    background-color: #fff;
    color: inherit;

    &:disabled {
      background-color: ${({ theme }) => theme.colors.light['gray-400']};
    }
  }

  button {
    cursor: pointer;
    /* font-weight: bold; */
    font-size: ${({ theme }) => theme.font['sm-font']};
    background-color: ${({ theme }) => theme.colors['primary-color']};
    border: none;
    padding: ${({ theme }) =>
      `${theme.space['fluid-block-space-3']} ${theme.space['fluid-inline-space-7']}`};

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
