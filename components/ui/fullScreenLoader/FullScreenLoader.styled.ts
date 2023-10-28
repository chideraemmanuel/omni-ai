import styled from 'styled-components';

export const FullScreenLoaderContainer = styled.div`
  position: fixed;
  inset: 0;
  //   width: 100vw;
  //   height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: #fff;
  /* backdrop-filter: blur(10px); */

  svg {
    animation: rotate 2s infinite linear;
    width: ${({ theme }) => theme.space['fluid-inline-space-15']} !important;
    aspect-ratio: 1 / 1;
  }

  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

// export const StyledLoader = styled.div`
//   width: 12px;
//   height: 12px;
//   border-radius: 50%;
//   background: #b5cff8;
//   color: #b5cff8;
//   clip-path: inset(-26px);
//   animation: d8 2s infinite linear;

//   @keyframes d8 {
//     0% {
//       box-shadow: 0 0 0 0, 40px 0, -40px 0, 0 40px, 0 -40px;
//     }
//     10% {
//       box-shadow: 0 0 0 0, 12px 0, -40px 0, 0 40px, 0 -40px;
//     }
//     20% {
//       box-shadow: 0 0 0 4px, 0px 0, -40px 0, 0 40px, 0 -40px;
//     }
//     30% {
//       box-shadow: 0 0 0 4px, 0px 0, -12px 0, 0 40px, 0 -40px;
//     }
//     40% {
//       box-shadow: 0 0 0 8px, 0px 0, 0px 0, 0 40px, 0 -40px;
//     }
//     50% {
//       box-shadow: 0 0 0 8px, 0px 0, 0px 0, 0 12px, 0 -40px;
//     }
//     60% {
//       box-shadow: 0 0 0 12px, 0px 0, 0px 0, 0 0px, 0 -40px;
//     }
//     70% {
//       box-shadow: 0 0 0 12px, 0px 0, 0px 0, 0 0px, 0 -12px;
//     }
//     80% {
//       box-shadow: 0 0 0 16px, 0px 0, 0px 0, 0 0px, 0 0px;
//     }
//     90%,
//     100% {
//       box-shadow: 0 0 0 0, 40px 0, -40px 0, 0 40px, 0 -40px;
//     }
//   }
// `;

export const StyledLoader = styled.div`
  --c: radial-gradient(farthest-side, #b5cff8 90%, #0000);
  width: 32px;
  height: 32px;
  background: var(--c) 0 0, var(--c) 100% 0, var(--c) 100% 100%, var(--c) 0 100%;
  background-size: 12px 12px; // INCREASE BACKGROUND SIZE TO INCREASE
  background-repeat: no-repeat;
  animation: d8 0.5s infinite;

  @keyframes d8 {
    100% {
      background-position: 100% 0, 100% 100%, 0 100%, 0 0;
    }
  }
  /* --c: radial-gradient(farthest-side, #b5cff8 90%, #0000);
  width: 64px;
  height: 64px;
  background: var(--c) 0 0, var(--c) 100% 0, var(--c) 100% 100%, var(--c) 0 100%;
  background-size: 24px 24px;
  background-repeat: no-repeat;
  animation: d8 0.5s infinite;

  @keyframes d8 {
    100% {
      background-position: 100% 0, 100% 100%, 0 100%, 0 0;
    }
  } */
`;

// NORMAL SIZE ***************
// .custom-loader {
//   width: 12px;
//   height: 12px;
//   border-radius: 50%;
//   background:#B5CFF8;
//   color: #B5CFF8;
//   clip-path: inset(-26px);
//   animation: d8 2s infinite linear;
// }

// @keyframes d8 {
//   0%  {box-shadow:0 0 0 0   , 40px 0,-40px 0,0 40px,0 -40px}
//   10% {box-shadow:0 0 0 0   , 12px 0,-40px 0,0 40px,0 -40px}
//   20% {box-shadow:0 0 0 4px , 0px  0,-40px 0,0 40px,0 -40px}
//   30% {box-shadow:0 0 0 4px , 0px  0,-12px 0,0 40px,0 -40px}
//   40% {box-shadow:0 0 0 8px , 0px  0,  0px 0,0 40px,0 -40px}
//   50% {box-shadow:0 0 0 8px , 0px  0,  0px 0,0 12px,0 -40px}
//   60% {box-shadow:0 0 0 12px, 0px  0,  0px 0,0  0px,0 -40px}
//   70% {box-shadow:0 0 0 12px, 0px  0,  0px 0,0  0px,0 -12px}
//   80% {box-shadow:0 0 0 16px, 0px  0,  0px 0,0  0px,0  0px }
//   90%,
//   100%{box-shadow:0 0 0 0   , 40px 0,-40px 0,0 40px,0 -40px}
// }

//
// LARGE SIZE *****************
// .custom-loader {
//   width: 24px;
//   height: 24px;
//   border-radius: 50%;
//   background:#B5CFF8;
//   color: #B5CFF8;
//   clip-path: inset(-52px);
//   animation: d8 2s infinite linear;
// }

// @keyframes d8 {
//   0%  {box-shadow:0 0 0 0   , 80px 0,-80px 0,0 80px,0 -80px}
//   10% {box-shadow:0 0 0 0   , 24px 0,-80px 0,0 80px,0 -80px}
//   20% {box-shadow:0 0 0 8px , 0px  0,-80px 0,0 80px,0 -80px}
//   30% {box-shadow:0 0 0 8px , 0px  0,-24px 0,0 80px,0 -80px}
//   40% {box-shadow:0 0 0 16px , 0px  0,  0px 0,0 80px,0 -80px}
//   50% {box-shadow:0 0 0 16px , 0px  0,  0px 0,0 24px,0 -80px}
//   60% {box-shadow:0 0 0 24px, 0px  0,  0px 0,0  0px,0 -80px}
//   70% {box-shadow:0 0 0 24px, 0px  0,  0px 0,0  0px,0 -24px}
//   80% {box-shadow:0 0 0 32px, 0px  0,  0px 0,0  0px,0  0px }
//   90%,
//   100%{box-shadow:0 0 0 0   , 80px 0,-80px 0,0 80px,0 -80px}
// }
//
//
//
// FOR IMAGE GEN *****************
// .custom-loader {
//   width: 4px;
//   height: 4px;
//   color: #b5cff8;
//   border-radius: 50%;
//   box-shadow: 19px 0 0 7px, 38px 0 0 3px, 57px 0 0 0;
//   transform: translateX(-38px);
//   animation: d1 .5s infinite alternate linear;
// }

// @keyframes d1 {
//   50%  {box-shadow: 19px 0 0 3px, 38px 0 0 7px, 57px 0 0 3px}
//   100% {box-shadow: 19px 0 0 0  , 38px 0 0 3px, 57px 0 0 7px}
// }
