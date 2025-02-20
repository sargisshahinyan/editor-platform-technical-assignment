import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { useGetPhoto } from "../../api/pexel/getPhoto/useGetPhoto.ts";

import picsartLogo from "../../shared/assets/picsart-logo.svg";

import { Container, LogoImage, LogoLink } from "./styles";

const PhotoDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: photo, isError } = useGetPhoto(id ? parseInt(id, 10) : undefined);

  useEffect(() => {
    if (!id || isError) {
      navigate("/", { replace: true });
      return;
    }
  }, [id, navigate, isError]);

  if (!id || photo) {
    return null;
  }

  return (
    <Container>
      <LogoLink to="/">
        <LogoImage src={picsartLogo} alt="Picsart logo" />
      </LogoLink>
    </Container>
  );
};

export default PhotoDetails;
