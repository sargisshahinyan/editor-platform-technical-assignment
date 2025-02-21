import { Link } from "react-router";
import styled, { css } from "styled-components";

import { breakpoints } from "../../../../shared/data/breakpoints";

export const PhotoElementWrapper = styled(Link)<{ width?: number; height?: number }>`
  ${({ width }) =>
    width !== undefined &&
    css`
      width: ${width}px;
    `}
  ${({ height }) =>
    height !== undefined &&
    css`
      height: ${height}px;
    `}
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 2.25rem;
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
