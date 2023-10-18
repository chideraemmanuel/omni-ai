import styled from 'styled-components';

export const StyledTypingAnimation = styled.div`
  width: 25px;
  height: 12px;
  background: radial-gradient(circle closest-side, #666 90%, #0000) 0% 50%,
    radial-gradient(circle closest-side, #666 90%, #0000) 50% 50%,
    radial-gradient(circle closest-side, #666 90%, #0000) 100% 50%;
  background-size: calc(100% / 3) 6px; // INCREASE PX TO INCREASE SIZE
  background-repeat: no-repeat;
  animation: bounce 1s infinite linear;

  @keyframes bounce {
    20% {
      background-position: 0% 0%, 50% 50%, 100% 50%;
    }
    40% {
      background-position: 0% 100%, 50% 0%, 100% 50%;
    }
    60% {
      background-position: 0% 50%, 50% 100%, 100% 0%;
    }
    80% {
      background-position: 0% 50%, 50% 50%, 100% 100%;
    }
  }
`;

// BOUNCING ******************
// SMALL****
// .custom-loader {
//   width:25px;
//   height:12px;
//   background:
//     radial-gradient(circle closest-side,#666 90%,#0000) 0%   50%,
//     radial-gradient(circle closest-side,#666 90%,#0000) 50%  50%,
//     radial-gradient(circle closest-side,#666 90%,#0000) 100% 50%;
//   background-size:calc(100%/3) 6px; INCREASE PX TO INCREASE SIZE
//   background-repeat: no-repeat;
//   animation:d3 1s infinite linear;
// }
// @keyframes d3 {
//     20%{background-position:0%   0%, 50%  50%,100%  50%}
//     40%{background-position:0% 100%, 50%   0%,100%  50%}
//     60%{background-position:0%  50%, 50% 100%,100%   0%}
//     80%{background-position:0%  50%, 50%  50%,100% 100%}
// }

//
// FADING ****************
// SMALL *****
// .custom-loader {
//   width:6px; INCREASE WIDTH AND HEIGHT TO INCREASE SIZE
//   height:6px;
//   background: #666666;
//   border-radius: 50%;
//   box-shadow: 10px 0 #66666622,-10px 0 #666666;
//   animation:d5 1s infinite linear alternate;
// }
// @keyframes d5 {
//     0% {box-shadow: 10px 0 #666666,-10px 0 #66666622;background: #666666}
//     33%{box-shadow: 10px 0 #666666,-10px 0 #66666622;background: #66666622}
//     66%{box-shadow: 10px 0 #66666622,-10px 0 #666666;background: #66666622}
// }

//
// SCALING **************
// SMALL *****
// .custom-loader {
//   width:25px; DOUBLE WIDTH AND HEIGHT TO INCREASE
//   height:6px;
//   background:
//     radial-gradient(circle closest-side,#666 90%,#0000) 0%   50%,
//     radial-gradient(circle closest-side,#666 90%,#0000) 50%  50%,
//     radial-gradient(circle closest-side,#666 90%,#0000) 100% 50%;
//   background-size:calc(100%/3) 100%;
//   background-repeat: no-repeat;
//   animation:d7 1s infinite linear;
// }
// @keyframes d7 {
//     33%{background-size:calc(100%/3) 0%  ,calc(100%/3) 100%,calc(100%/3) 100%}
//     50%{background-size:calc(100%/3) 100%,calc(100%/3) 0%  ,calc(100%/3) 100%}
//     66%{background-size:calc(100%/3) 100%,calc(100%/3) 100%,calc(100%/3) 0%  }
// }

//
// TYPEWRITTER *****************
// SMALL ****
// .custom-loader {
//   width:25px; DOUBLE WIDTH AND HEIGHT TO INCREASE
//   height:6px;
//   background: radial-gradient(circle closest-side,#666 90%,#0000) 0 0/33% 100% space;
//   clip-path: inset(0 100% 0 0);
//   animation:d1 1s steps(4) infinite;
// }
// @keyframes d1 {to{clip-path: inset(0 -34% 0 0)}}
