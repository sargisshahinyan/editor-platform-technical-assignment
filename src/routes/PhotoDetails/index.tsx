import picsartLogo from "../../shared/assets/picsart-logo.svg";

import { Container, LogoImage } from "./styles";

const PhotoDetails = () => {
  return (
    <Container>
      <LogoImage src={picsartLogo} alt="Picsart logo" />
    </Container>
  );
};

export default PhotoDetails;
