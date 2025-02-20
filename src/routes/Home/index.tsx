import { ComponentRef, useEffect, useMemo, useRef } from "react";

import { useGetCuratedPhotos } from "../../api/pexel/getCuratedPhotos/useGetCuratedPhotos";
import { useMediaQueries } from "../../shared/hooks/useMediaQueries";

import { generateImagesMatrix } from "./helpers/generateImagesMatrix";
import { getOptimizedImageProps } from "./helpers/getOptimizedImageProps";

import picsartLogo from "../../shared/assets/picsart-logo.svg";

import { Column, Container, Image, ImagesContainer, ImageWrapper, LogoImage } from "./styles";

export const Home = () => {
  const { isTablet, isSmallDesktop } = useMediaQueries();
  const imagesContainerRef = useRef<ComponentRef<"div">>(null);
  const bottomElementRef = useRef<ComponentRef<"div">>(null);

  const { data, isFetching, fetchNextPage } = useGetCuratedPhotos({
    perPage: 25,
  });

  const { columnsCount, photosColumns } = useMemo(() => {
    if (!data) {
      return {
        columnsCount: 0,
        photosColumns: undefined,
      };
    }

    let columns;
    switch (true) {
      case isSmallDesktop:
        columns = 4;
        break;
      case isTablet:
        columns = 3;
        break;
      default:
        columns = 2;
        break;
    }

    const photos = data.pages.flatMap((page) => page.photos);

    return {
      columnsCount: columns,
      photosColumns: generateImagesMatrix(photos, columns),
    };
  }, [data, isTablet, isSmallDesktop]);

  useEffect(() => {
    if (isFetching || !bottomElementRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          void fetchNextPage();
        }
      },
      {
        rootMargin: "400px",
      },
    );

    observer.observe(bottomElementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, isFetching]);

  const columnWidth = (imagesContainerRef.current?.clientWidth ?? 1440) / columnsCount;

  return (
    <Container>
      <LogoImage src={picsartLogo} alt="Picsart logo" />
      <ImagesContainer ref={imagesContainerRef}>
        {photosColumns?.map((photos, index) => (
          <Column key={index}>
            {photos.map((photo) => (
              <ImageWrapper key={photo.id}>
                <Image {...getOptimizedImageProps(photo, columnWidth)} alt={photo.photographer} loading="lazy" />
              </ImageWrapper>
            ))}
          </Column>
        ))}
      </ImagesContainer>
      <div ref={bottomElementRef} />
    </Container>
  );
};

export default Home;
