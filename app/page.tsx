'use client';

import { FC } from 'react';
import styles from './page.module.scss';
import bg from '@/assets/sign_in_showcase.jpg';
import Button from '@/components/ui/button/Button';
import Logo from '@/components/ui/logo/Logo';

interface Props {}

const Homepage: FC<Props> = () => {
  return (
    <div
      className={styles.container}
      style={{ background: `url(${bg.src}) no-repeat center center/cover` }}
    >
      <div className={styles.header}>
        <div className={styles.header_container}>
          <Logo variant="light" />
        </div>
      </div>
      <div className={styles.hero}>
        <div className={styles.hero_container}>
          <h2>AI tools for creativity and productivity.</h2>
          <div>
            <p>
              OmniAI is a friendly toolkit that helps you be more creative and
              productive. Need to generate text, translate languages, write
              different kinds of creative content, or answer your questions in
              an informative way? Our virtual assistant is here to help! Feeling
              artistic? Dive into our image generation tool and let your
              imagination run wild!
            </p>
            <p>
              Join us in the fun – it's creativity without limits. Ready to get
              started?
            </p>
          </div>

          <Button size="lg" tagType="a" href="/register">
            Get started
          </Button>
        </div>
      </div>
    </div>
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
