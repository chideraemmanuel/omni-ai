import { FC } from 'react';
import { ChatBubbleContainer } from './ChatBubble.styled';

interface Props {
  content: string | React.ReactNode;
  role: 'user' | 'assistant';
}

const ChatBubble: FC<Props> = ({ content, role }) => {
  return (
    <ChatBubbleContainer $role={role}>
      <p>{content}</p>
    </ChatBubbleContainer>
  );
};

export default ChatBubble;
