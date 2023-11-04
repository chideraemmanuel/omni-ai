'use client';

import { FC, FormEvent, useRef, useEffect } from 'react';
import {
  ChatContainer,
  ConversationContainer,
  InputContainer,
} from './page.styled';
import ChatBubble from '@/components/ui/chatBubble/ChatBubble';
import { useDispatch, useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import { setUserInput } from '@/redux/slices/chat/chatSlice';
import { useSendMessage } from '@/lib/hooks/useSendMessage';
import TypingAnimation from '@/components/misc/typingAnimation/TypingAnimation';

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

  const ref = useRef(null);

  useEffect(() => {
    // @ts-ignore
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ChatContainer>
      {messages.length === 0 && (
        <p className="notice">
          Please note that conversations aren't being saved, and will be wiped
          as soon as you reload this page. Be sure to use the responses as you
          get them.
        </p>
      )}
      <ConversationContainer>
        {/* <ChatBubble content="Hi there!" role="user" />
        <ChatBubble
          content="Hello, how can i assist you today?"
          role="assistant"
        /> */}
        {messages.map((message, index) => (
          <ChatBubble
            content={message.content}
            role={message.role}
            key={index}
          />
        ))}
        {/* {isResponding && <ChatBubble role="assistant" content={'● ● ●'} />} */}
        {isResponding && (
          <ChatBubble role="assistant" content={<TypingAnimation />} />
        )}
        <div ref={ref}></div>
      </ConversationContainer>
      <InputContainer onSubmit={(e) => handleSubmit(e)}>
        <textarea
          placeholder="Ask me anything"
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
