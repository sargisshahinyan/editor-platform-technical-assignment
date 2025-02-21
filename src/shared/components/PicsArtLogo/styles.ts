import styled from "styled-components";
import { Link } from "react-router";

import { breakpoints } from "../../data/breakpoints";

export const LogoLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2.25rem;

  @media (max-width: ${breakpoints.tablet - 1}px) {
    margin-bottom: 1rem;
  }
`;

export const LogoImage = styled.img``;
