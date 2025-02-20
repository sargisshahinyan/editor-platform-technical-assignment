import picsartLogo from "../../shared/assets/picsart-logo.svg";

import { Container, LogoImage, LogoLink } from "./styles";

const PhotoDetails = () => {
  return (
    <Container>
      <LogoLink to="/">
        <LogoImage src={picsartLogo} alt="Picsart logo" />
      </LogoLink>
    </Container>
  );
};

export default PhotoDetails;
