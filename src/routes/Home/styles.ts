import styled from "styled-components";

import { PageSlot } from "../../shared/components/PageSlot";

import { breakpoints } from "../../shared/data/breakpoints";
import { Loader } from "../../shared/components/Loader";

export const Container = styled(PageSlot)`
  padding-top: 2.5rem;
  position: relative;
  min-height: 100vh;
  box-sizing: content-box;

  @media (max-width: ${breakpoints.tablet - 1}px) {
    padding-top: 1rem;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.25rem;
  max-width: 40rem;

  @media (max-width: ${breakpoints.tablet - 1}px) {
    margin-bottom: 1rem;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SearchInput = styled.input`
  width: 20rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid #e0e0e0;
  font-size: 1rem;
  font-family: "Gilroy", sans-serif;
  font-weight: 300;
`;

export const PageLoader = styled(Loader)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ImagesContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  flex-basis: 50%;

  @media (min-width: ${breakpoints.tablet}px) {
    flex-basis: calc(100% / 3);
  }

  @media (min-width: ${breakpoints.smallDesktop}px) {
    flex-basis: 25%;
  }
`;
