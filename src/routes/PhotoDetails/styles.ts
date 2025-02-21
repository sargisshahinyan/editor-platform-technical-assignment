import styled, { css } from "styled-components";

import { PageSlot } from "../../shared/components/PageSlot";
import { Loader } from "../../shared/components/Loader";

import { breakpoints } from "../../shared/data/breakpoints";

export const Container = styled(PageSlot)`
  padding-block: 2.5rem;

  @media (max-width: ${breakpoints.tablet - 1}px) {
    padding-block: 1rem;
  }
`;

export const BackButtonWrapper = styled.div`
  margin-bottom: 2.25rem;

  @media (max-width: ${breakpoints.tablet - 1}px) {
    margin-bottom: 1rem;
  }
`;

export const BackButtonIcon = styled.img`
  width: 1rem;
  height: 0.75rem;
`;

export const PhotoDetailsWrapper = styled.div<{ hidden?: boolean }>`
  display: flex;
  gap: 3.75rem;

  @media (max-width: ${breakpoints.tablet - 1}px) {
    flex-direction: column;
    gap: 1.5rem;
  }

  ${(props) =>
    props.hidden &&
    css`
      visibility: hidden;
    `}
`;

export const PhotoWrapper = styled.div<{ height?: number }>`
  flex: 2;
  background-color: #f1f1f1;
  position: relative;

  @media (max-width: ${breakpoints.tablet - 1}px) {
    flex: auto;
  }

  ${(props) =>
    props.height &&
    css`
      height: ${props.height}px;
    `}
`;

export const PhotoLoader = styled(Loader)<{ top?: string }>`
  position: absolute;
  top: ${(props) => (props.top ? props.top : css`min(50%, 10rem)`)};
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

export const Photo = styled.img<{ hidden?: boolean }>`
  border-radius: 1rem;
  max-width: 100%;
  ${(props) =>
    props.hidden &&
    css`
      opacity: 0;
    `}
`;

export const DetailsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: ${breakpoints.tablet - 1}px) {
    flex: auto;
  }
`;

export const DetailsBlock = styled.div`
  padding: 0.5rem 1rem;
  background-color: #d9d9d9;
  border-radius: 0.625rem;
`;

export const DetailsBlockTitle = styled.h3`
  font-size: 1.5rem;
  font-family: "Gilroy", sans-serif;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0.25rem;
`;

export const DetailsBlockContent = styled.div`
  font-size: 1rem;
  font-family: "Gilroy", sans-serif;
  font-weight: 300;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PhotoColor = styled.div<{ color: string }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.375rem;
  background-color: ${(props) => props.color};
`;
