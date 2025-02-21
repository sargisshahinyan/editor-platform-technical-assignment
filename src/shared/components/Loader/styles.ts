import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoaderImage = styled.img`
  width: 3.375rem;
  height: 3.375rem;
  animation: ${spin} 1s ease-in-out infinite;
`;
