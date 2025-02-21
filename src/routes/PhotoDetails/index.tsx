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
  Header,
  Photo,
  PhotoColor,
  PhotoDetailsWrapper,
  PhotoLoader,
  PhotoWrapper,
} from "./styles";

const PhotoDetails = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();
  const [imagesWrapperWidth, setImagesWrapperWidth] = useState<number | undefined>(0);
  const imageWrapperRef = useRef<ComponentRef<"div">>(null);
  const { id } = useParams<{ id: string }>();
  const { data: photo, isError, isLoading } = useGetPhoto(id ? parseInt(id, 10) : undefined);

  useEffect(() => {
    if (!id || isError) {
      navigate("/", { replace: true });
      return;
    }
  }, [id, navigate, isError]);

  useEffect(() => {
    if (!imageWrapperRef.current) {
      return;
    }

    setImagesWrapperWidth(imageWrapperRef.current.clientWidth);
    const resizeObserver = new ResizeObserver(() => {
      if (!imageWrapperRef.current) {
        return;
      }

      setImagesWrapperWidth(imageWrapperRef.current.clientWidth);
    });
    resizeObserver.observe(imageWrapperRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  if (!id) {
    return null;
  }

  const height = imagesWrapperWidth && photo ? photo.height / (photo.width / imagesWrapperWidth) : undefined;
  return (
    <Container>
      <Header>
        <PicsArtLogo />
      </Header>
      <BackButtonWrapper>
        <Link to="/" aria-label="Back">
          <BackButtonIcon src={leftArrow} alt="Back" />
        </Link>
      </BackButtonWrapper>
      {isLoading && <PhotoLoader top="40%" />}
      <PhotoDetailsWrapper hidden={isLoading}>
        <PhotoWrapper ref={imageWrapperRef} height={height}>
          {photo && (
            <Photo
              hidden={!isImageLoaded}
              src={photo.src.original}
              onLoad={() => {
                setIsImageLoaded(true);
              }}
              alt={photo.alt}
              height={height}
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
