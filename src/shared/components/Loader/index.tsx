import { LoaderImage } from "./styles";

export const Loader = ({ className }: { className?: string }) => (
  <LoaderImage className={className} src="/assets/loader.svg" alt="Loading..." />
);
