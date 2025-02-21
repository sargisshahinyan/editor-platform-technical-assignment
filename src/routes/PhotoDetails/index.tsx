import { ComponentRef, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router";

import { useGetPhoto } from "../../api/pexel/getPhoto/useGetPhoto";

import { PicsArtLogo } from "../../shared/components/PicsArtLogo";

import leftArrow from "../../shared/assets/left-arrow.svg";

import {
  BackButtonIcon,
  BackButtonWrapper,
  Container,
  DetailsBlock,
  DetailsBlockContent,
  DetailsBlockTitle,
  DetailsWrapper,
  Photo,
  PhotoColor,
  PhotoDetailsWrapper,
  PhotoLoader,
  PhotoWrapper,
} from "./styles";

const PhotoDetails = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();
  const imageWrapperRef = useRef<ComponentRef<"div">>(null);
  const { id } = useParams<{ id: string }>();
  const { data: photo, isError, isLoading } = useGetPhoto(id ? parseInt(id, 10) : undefined);

  useEffect(() => {
    if (!id || isError) {
      navigate("/", { replace: true });
      return;
    }
  }, [id, navigate, isError]);

  if (!id) {
    return null;
  }

  return (
    <Container>
      <PicsArtLogo />
      <BackButtonWrapper>
        <Link to="/">
          <BackButtonIcon src={leftArrow} alt="Back" />
        </Link>
      </BackButtonWrapper>
      {isLoading && <PhotoLoader top="40%" />}
      <PhotoDetailsWrapper hidden={isLoading}>
        <PhotoWrapper
          ref={imageWrapperRef}
          height={
            imageWrapperRef.current && photo
              ? photo.height / (photo.width / imageWrapperRef.current.offsetWidth)
              : undefined
          }
        >
          {photo && (
            <Photo
              hidden={!isImageLoaded}
              src={photo.src.original}
              onLoad={() => {
                setIsImageLoaded(true);
              }}
            />
          )}
          {!isImageLoaded && <PhotoLoader />}
        </PhotoWrapper>
        <DetailsWrapper>
          <DetailsBlock>
            <DetailsBlockTitle>Photographer</DetailsBlockTitle>
            <DetailsBlockContent>{photo?.photographer}</DetailsBlockContent>
          </DetailsBlock>
          <DetailsBlock>
            <DetailsBlockTitle>Photographer URL</DetailsBlockTitle>
            <DetailsBlockContent>
              <a href={photo?.photographerUrl} target="_blank" rel="noreferrer">
                {photo?.photographerUrl}
              </a>
            </DetailsBlockContent>
          </DetailsBlock>
          <DetailsBlock>
            <DetailsBlockTitle>Size</DetailsBlockTitle>
            <DetailsBlockContent>{photo && `${photo.width} x ${photo.height}`}</DetailsBlockContent>
          </DetailsBlock>
          <DetailsBlock>
            <DetailsBlockTitle>Photo average color</DetailsBlockTitle>
            <DetailsBlockContent>
              {photo && (
                <>
                  <PhotoColor color={photo.avgColor} />
                  {photo.avgColor}
                </>
              )}
            </DetailsBlockContent>
          </DetailsBlock>
        </DetailsWrapper>
      </PhotoDetailsWrapper>
    </Container>
  );
};

export default PhotoDetails;
