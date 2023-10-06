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

interface Props {}

const ChatPage: FC<Props> = () => {
  const { userInput, messages, isResponding } = useSelector(
    (store: StoreTypes) => store.chat
  );

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(setUserInput(''));
    dispatch(addUserMessage(userInput));
    dispatch(sendMessage(messages));
  };

  return (
    <ChatContainer>
      <ConversationContainer>
        {/* <ChatBubble text="Hi there!" role="user" />
        <ChatBubble
          text="Hello, how can i assist you today?"
          role="assistant"
        /> */}
        {messages.map((message, index) => (
          <ChatBubble text={message.content} role={message.role} />
        ))}
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
