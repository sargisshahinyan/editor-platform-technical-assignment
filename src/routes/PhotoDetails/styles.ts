import styled from "styled-components";

import { PageSlot } from "../../shared/components/PageSlot";

import { breakpoints } from "../../shared/data/breakpoints";
import { Link } from "react-router";

export const Container = styled(PageSlot)`
  padding-block: 2.5rem;

  @media (max-width: ${breakpoints.tablet - 1}px) {
    padding-block: 1rem;
  }
`;

export const LogoLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2.25rem;

  @media (max-width: ${breakpoints.tablet - 1}px) {
    margin-bottom: 1rem;
  }
`;

export const LogoImage = styled.img``;

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

export const PhotoDetailsWrapper = styled.div`
  display: flex;
  gap: 3.75rem;

  @media (max-width: ${breakpoints.tablet - 1}px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const PhotoWrapper = styled.div`
  flex: 2;
`;

export const Photo = styled.img`
  border-radius: 1rem;
  max-width: 100%;
`;

export const DetailsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

export const DetailsBlockContent = styled.p`
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
