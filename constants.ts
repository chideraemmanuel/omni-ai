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
        label: 'Chat Bot',
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
    name: 'Chat Bot',
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
