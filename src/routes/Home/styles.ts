import styled from "styled-components";

import { PageSlot } from "../../shared/components/PageSlot";

import { breakpoints } from "../../shared/data/breakpoints";

export const Container = styled(PageSlot)`
  padding-top: 2.5rem;
`;

export const LogoImage = styled.img`
  display: inline-block;
  margin-bottom: 2.25rem;
`;

export const ImagesContainer = styled.div`
  display: flex;
`;

export const Column = styled.div`
  flex-basis: 50%;

  @media (min-width: ${breakpoints.tablet}px) {
    flex-basis: calc(100% / 3);
  }

  @media (min-width: ${breakpoints.smallDesktop}px) {
    flex-basis: 25%;
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
