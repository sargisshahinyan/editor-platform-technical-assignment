import styled from "styled-components";
import { breakpoints } from "../../shared/data/breakpoints.ts";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  padding: 0 0.25rem 0.25rem;
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;
