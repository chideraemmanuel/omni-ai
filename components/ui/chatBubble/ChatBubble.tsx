import { FC } from 'react';
import { ChatBubbleContainer } from './ChatBubble.styled';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import SyntaxHighlighter from 'react-syntax-highlighter';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';

interface Props {
  content: string | React.ReactNode;
  role: 'user' | 'assistant';
}

const ChatBubble: FC<Props> = ({ content, role }) => {
  const renderers = {
    code: ({
      language,
      value,
    }: {
      language: string;
      value: string | string[];
    }) => {
      return (
        // <SyntaxHighlighter style={dark} language={language} children={value} />
        <SyntaxHighlighter language={language} children={value} />
      );
    },
  };

  return (
    <ChatBubbleContainer $role={role}>
      {/* <p>{content}</p> */}
      {typeof content === 'string' ? (
        <p>
          <ReactMarkdown renderers={renderers}>{content}</ReactMarkdown>
        </p>
      ) : (
        // <p>{content}</p>
        <p>{content}</p>
      )}
    </ChatBubbleContainer>
  );
};

export default ChatBubble;
