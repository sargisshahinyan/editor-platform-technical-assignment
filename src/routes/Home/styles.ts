import styled from "styled-components";

import { PageSlot } from "../../shared/components/PageSlot";

import { breakpoints } from "../../shared/data/breakpoints";
import { Loader } from "../../shared/components/Loader";

export const Container = styled(PageSlot)`
  padding-top: 2.5rem;
  position: relative;
  min-height: 100vh;

  @media (max-width: ${breakpoints.tablet - 1}px) {
    padding-top: 1rem;
  }
`;

export const PageLoader = styled(Loader)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const LogoImage = styled.img`
  display: inline-block;
  margin-bottom: 2.25rem;

  @media (max-width: ${breakpoints.tablet}px) {
    margin-bottom: 1rem;
  }
`;

export const ImagesContainer = styled.div`
  display: flex;
`;

export const ImageWrapper = styled.div`
  padding: 0.375rem;
  position: relative;
`;

export const Column = styled.div`
  flex-basis: 50%;

  &:first-child > ${ImageWrapper} {
    padding-left: 0;
  }
  &:last-child > ${ImageWrapper} {
    padding-right: 0;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    flex-basis: calc(100% / 3);
  }

  @media (min-width: ${breakpoints.smallDesktop}px) {
    flex-basis: 25%;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 2.25rem;

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
