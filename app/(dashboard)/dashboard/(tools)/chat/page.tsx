'use client';

import { FC, FormEvent } from 'react';
import {
  ChatContainer,
  ConversationContainer,
  InputContainer,
} from './page.styled';
import ChatBubble from '@/components/ui/chatBubble/ChatBubble';
import { useDispatch, useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import { addUserMessage, setUserInput } from '@/redux/slices/chat/chatSlice';
import { sendMessage } from '@/redux/slices/chat/chatService';
import RelativeLoader from '@/components/ui/relativeLoader/RelativeLoader';
import { toast } from 'react-toastify';
import { useSendMessage } from '@/lib/hooks/useSendMessage';

interface Props {}

const ChatPage: FC<Props> = () => {
  const {
    userInput,
    messages,
    isLoading: isResponding,
  } = useSelector((store: StoreTypes) => store.chat);

  const dispatch = useDispatch();

  const { mutate: sendMessage } = useSendMessage();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendMessage(userInput);
  };

  return (
    <ChatContainer>
      <ConversationContainer>
        {/* {isResponding && <RelativeLoader />} */}
        {/* <ChatBubble text="Hi there!" role="user" />
        <ChatBubble
          text="Hello, how can i assist you today?"
          role="assistant"
        /> */}
        {messages.map((message, index) => (
          <ChatBubble
            content={message.content}
            role={message.role}
            key={index}
          />
        ))}
        {isResponding && <ChatBubble role="assistant" content={'● ● ●'} />}
      </ConversationContainer>
      <InputContainer onSubmit={(e) => handleSubmit(e)}>
        {/* <input type="text" placeholder="Type a message." /> */}
        <textarea
          placeholder="Type a message"
          value={userInput}
          onChange={(e) => dispatch(setUserInput(e.target.value))}
          disabled={isResponding}
        />
        <button disabled={userInput.length === 0 || isResponding}>Send</button>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatPage;
