export const DashboardNavigationLinks = [
  {
    label: 'Menu',
    links: [
      {
        label: 'Dashboard',
        href: '/dashboard',
      },
    ],
  },
  {
    label: 'Tools',
    links: [
      {
        label: 'Virtual Assistant',
        href: '/dashboard/chat',
      },
      {
        label: 'Image Generation',
        href: '/dashboard/generate-image',
      },
    ],
  },
];

export const tools = [
  {
    name: 'Virtual Assistant',
    description: 'Chat with our AI text generation model about anything!',
    href: '/dashboard/chat',
  },
  {
    name: 'Image Generation',
    description: 'Turn your prompts to images with our image generation model',
    href: '/dashboard/generate-image',
  },
];

export const imageNumberList = [
  {
    title: '1 image',
    value: '1',
  },
  {
    title: '2 images',
    value: '2',
  },
  {
    title: '3 images',
    value: '3',
  },
  {
    title: '4 images',
    value: '4',
  },
];

export const sizeList = [
  {
    title: '256 x 256',
    value: '256',
  },
  {
    title: '512 x 512',
    value: '512',
  },
  {
    title: '1024 x 1024',
    value: '1024',
  },
];

export const profileColors = [
  '#FFDDC1',
  '#FFB6C1',
  '#FFD700',
  '#FFA07A',
  '#FF6347',
  '#FF4500',
  '#FFA500',
  '#FF8C00',
  '#FFDAB9',
  '#FFE4B5',
  '#FFC0CB',
  '#FF69B4',
  '#FF1493',
  '#FFC3A0',
  '#FFB6C1',
  '#FF69B4',
  '#FF00FF',
  '#FF00FF',
  '#8A2BE2',
  '#9932CC',
  '#DA70D6',
  '#BA55D3',
  '#9370DB',
  '#800080',
  '#4B0082',
  '#6A5ACD',
  '#483D8B',
  '#7B68EE',
  '#0000FF',
  '#0000CD',
];

// TODO: install openai sdk, take screenshots of all openai tools implementation, make route handlers for all tools
// try login and register functionalities.

// import Typewriter from 'typewriter-effect';

// <Typewriter
//   onInit={(typewriter) => {
//     typewriter
//       .typeString('Hello World!')
//       .callFunction(() => {
//         console.log('String typed out!');
//       })
//       .pauseFor(2500)
//       .deleteAll()
//       .callFunction(() => {
//         console.log('All strings were deleted');
//       })
//       .start();
//   }}
// />;

// import Typewriter from 'typewriter-effect';

// <Typewriter
//   options={{
//     strings: ['Hello', 'World'],
//     autoStart: true,
//     loop: true,
//   }}
// />;

//
//
//
//
//
//
// function formatOpenAIResponse(messages) {
//     const codeBlocks = [];
//     let codeBlockCounter = 1;

//     for (const message of messages) {
//         if (message.role === 'user') {
//             // Handle user messages if needed
//         } else if (message.role === 'assistant') {
//             // Check if the assistant's reply contains a code block
//             const codeBlockMatches = message.content.match(/```([\s\S]*?)```/g);
//             if (codeBlockMatches) {
//                 for (const codeBlock of codeBlockMatches) {
//                     codeBlocks.push(`Code ${codeBlockCounter}:\n${codeBlock}`);
//                     codeBlockCounter++;
//                 }
//             } else {
//                 // Handle non-code block messages if needed
//             }
//         }
//     }

//     // Join code blocks with newlines to create a numbered list
//     const formattedResponse = codeBlocks.join('\n');
//     return formattedResponse;
// }

// // Example usage
// const apiResponse = [
//     // ... (same as before)
// ];

// const formattedResponse = formatOpenAIResponse(apiResponse);
// console.log(formattedResponse);
