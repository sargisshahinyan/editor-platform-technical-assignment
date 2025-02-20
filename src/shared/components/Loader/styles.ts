import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoaderImage = styled.img`
  width: 50px;
  height: 50px;
  animation: ${rotate} 1s ease-in-out infinite;
`;
