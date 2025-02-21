import picsartLogo from "../../assets/picsart-logo.svg";

import { LogoImage, LogoLink } from "./styles";

export const PicsArtLogo = () => {
  return (
    <LogoLink to="/" aria-label="PicsArt">
      <LogoImage width={240} height={55} src={picsartLogo} alt="Picsart logo" />
    </LogoLink>
  );
};
