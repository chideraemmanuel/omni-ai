'use client';

import { FC } from 'react';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import ChatBubble from '@/components/ui/chatBubble/ChatBubble';
import TypingAnimation from '@/components/misc/typingAnimation/TypingAnimation';

interface Props {}

const Homepage: FC<Props> = () => {
  const renderers = {
    code: ({
      language,
      value,
    }: {
      language: string;
      value: string | string[];
    }) => {
      return (
        <SyntaxHighlighter style={dark} language={language} children={value} />
      );
    },
  };

  return (
    <>
      <ChatBubble
        role="assistant"
        content={`
       hi
      `}
      />
      <ChatBubble role="assistant" content={<TypingAnimation />} />
    </>
  );
};

export default Homepage;

// [
//   {
//     index: 0,
//     message: {
//       role: 'assistant',
//       content:
//         'Sure! In React, `useState` is a hook that allows you to add state to functional components. \n' +
//         '\n' +
//         "Here's how `useState` works:\n" +
//         '\n' +
//         '1. First, import `useState` from the `react` library:\n' +
//         '```javascript\n' +
//         "import React, { useState } from 'react';\n" +
//         '```\n' +
//         '\n' +
//         '2. Inside your functional component, call the `useState` hook to declare a state variable and its initial value:\n' +
//         '```javascript\n' +
//         'const [count, setCount] = useState(0);\n' +
//         '```\n' +
//         'In this example, `count` is the name of the state variable and `setCount` is a function provided by `useState` that you can use to update the value of `count`. The argument `0` is the initial value of `count`.\n' +
//         '\n' +
//         '3. You can then use the state variable (`count`) and the function (`setCount`) in your component:\n' +
//         '```javascript\n' +
//         'return (\n' +
//         '  <div>\n' +
//         '    <p>Count: {count}</p>\n' +
//         '    <button onClick={() => setCount(count + 1)}>Increment</button>\n' +
//         '    <button onClick={() => setCount(count - 1)}>Decrement</button>\n' +
//         '  </div>\n' +
//         ');\n' +
//         '```\n' +
//         'In this example, we display the value of `count` in a paragraph tag. The two buttons increment and decrement the value of `count` by using the `setCount` function with the updated value.\n' +
//         '\n' +
//         "That's it! By using `useState`, you now have state management in your functional component.\n",
//     },
//     finish_reason: 'stop',
//   },
// ];
