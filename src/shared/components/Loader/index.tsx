import loader from "../../assets/loader.svg";

import { LoaderImage } from "./styles";

export const Loader = ({ className }: { className?: string }) => (
  <LoaderImage className={className} src={loader} alt="Loading..." />
);
