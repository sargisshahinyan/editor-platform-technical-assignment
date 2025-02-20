import { ReactNode } from "react";

import { PageSlotContainer } from "./styles";

export const PageSlot = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <PageSlotContainer className={className}>{children}</PageSlotContainer>;
};
