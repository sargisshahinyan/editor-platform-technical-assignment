import { Link } from "react-router";
import styled, { css, keyframes } from "styled-components";

import { breakpoints } from "../../../../shared/data/breakpoints";

const pulse = keyframes`
  50% {
    opacity: 0.5;
  }
`;

export const PhotoElementWrapper = styled(Link)`
  display: block;
  border-radius: 2.25rem;
  overflow: hidden;
  position: relative;
`;

export const Placeholder = styled.div`
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #d9d9d9;
`;

export const Image = styled.img<{ $transparent?: boolean }>`
  width: 100%;
  height: auto;
  ${({ $transparent }) =>
    $transparent &&
    css`
      opacity: 0;
    `}
  vertical-align: bottom;

  @media (hover: hover) {
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.02);
      transform-origin: center;
    }
  }

  @media (max-width: ${breakpoints.tablet - 1}px) {
    border-radius: 1.5rem;
  }
`;
