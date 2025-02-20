import styled from "styled-components";

import { PageSlot } from "../../shared/components/PageSlot";

import { breakpoints } from "../../shared/data/breakpoints";
import { Link } from "react-router";

export const Container = styled(PageSlot)`
  padding-top: 2.5rem;

  @media (max-width: ${breakpoints.tablet - 1}px) {
    padding-top: 1rem;
  }
`;

export const LogoLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2.25rem;

  @media (max-width: ${breakpoints.tablet}px) {
    margin-bottom: 1rem;
  }
`;

export const LogoImage = styled.img``;
