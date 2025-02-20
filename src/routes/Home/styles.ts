import styled from "styled-components";
import { breakpoints } from "../../shared/data/breakpoints.ts";

export const ImagesContainer = styled.div`
  display: flex;
  margin-top: 2rem;
`;

export const Column = styled.div`
  flex-basis: 50%;

  @media (min-width: ${breakpoints.tablet}px) {
    flex-basis: calc(100% / 3);
  }

  @media (min-width: ${breakpoints.smallDesktop}px) {
    flex-basis: 25%;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    flex-basis: 20%;
  }
`;

export const ImageWrapper = styled.div`
  padding: 0 0.5rem 0.5rem;
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  @media (hover: hover) {
    &:hover {
      transform: scale(1.02);
      transform-origin: center;
    }
  }
`;
