import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router";

import { useGetPhoto } from "../../api/pexel/getPhoto/useGetPhoto.ts";

import picsartLogo from "../../shared/assets/picsart-logo.svg";
import leftArrow from "../../shared/assets/left-arrow.svg";

import {
  BackButtonIcon,
  BackButtonWrapper,
  Container,
  DetailsBlock,
  DetailsBlockContent,
  DetailsBlockTitle,
  DetailsWrapper,
  LogoImage,
  LogoLink,
  Photo,
  PhotoColor,
  PhotoDetailsWrapper,
  PhotoWrapper,
} from "./styles";

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

  if (!id || !photo) {
    return null;
  }

  return (
    <Container>
      <LogoLink to="/">
        <LogoImage src={picsartLogo} alt="Picsart logo" />
      </LogoLink>
      <BackButtonWrapper>
        <Link to="/">
          <BackButtonIcon src={leftArrow} alt="Back" />
        </Link>
      </BackButtonWrapper>
      <PhotoDetailsWrapper>
        <PhotoWrapper>
          <Photo src={photo.src.original} />
        </PhotoWrapper>
        <DetailsWrapper>
          <DetailsBlock>
            <DetailsBlockTitle>Photographer</DetailsBlockTitle>
            <DetailsBlockContent>{photo.photographer}</DetailsBlockContent>
          </DetailsBlock>
          <DetailsBlock>
            <DetailsBlockTitle>Photographer URL</DetailsBlockTitle>
            <DetailsBlockContent>
              <a href={photo.photographerUrl} target="_blank" rel="noreferrer">
                {photo.photographerUrl}
              </a>
            </DetailsBlockContent>
          </DetailsBlock>
          <DetailsBlock>
            <DetailsBlockTitle>Size</DetailsBlockTitle>
            <DetailsBlockContent>
              {photo.width} x {photo.height}
            </DetailsBlockContent>
          </DetailsBlock>
          <DetailsBlock>
            <DetailsBlockTitle>Photo average color</DetailsBlockTitle>
            <DetailsBlockContent>
              <PhotoColor color={photo.avgColor} />
              {photo.avgColor}
            </DetailsBlockContent>
          </DetailsBlock>
        </DetailsWrapper>
      </PhotoDetailsWrapper>
    </Container>
  );
};

export default PhotoDetails;
