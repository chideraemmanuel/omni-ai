import { FC } from 'react';
import { ChatBubbleContainer } from './ChatBubble.styled';

interface Props {
  text: string;
  role: 'user' | 'assistant';
}

const ChatBubble: FC<Props> = ({ text, role }) => {
  return (
    <ChatBubbleContainer role={role}>
      <p>{text}</p>
    </ChatBubbleContainer>
  );
};

export default ChatBubble;
