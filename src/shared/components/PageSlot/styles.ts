import styled from "styled-components";

import { toRem } from "../../helpers/toRem";
import { breakpoints } from "../../data/breakpoints";

export const PageSlotContainer = styled.div`
  max-width: ${toRem(breakpoints.largeDesktop)};
  margin: 0.5rem auto;
`;
