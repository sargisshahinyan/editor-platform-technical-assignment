import { ComponentRef, useEffect, useMemo, useRef } from "react";

import { useGetCuratedPhotos } from "../../api/pexel/getCuratedPhotos/useGetCuratedPhotos";
import { useMediaQueries } from "../../shared/hooks/useMediaQueries";

import { generateImagesMatrix } from "./helpers/generateImagesMatrix";

import picsartLogo from "../../shared/assets/picsart-logo.svg";

import { PhotoElement } from "./components/PhotoElement";

import { Column, Container, ImagesContainer, LogoImage, PageLoader } from "./styles";

export const Home = () => {
  const { isTablet, isSmallDesktop } = useMediaQueries();
  const imagesContainerRef = useRef<ComponentRef<"div">>(null);
  const bottomElementRef = useRef<ComponentRef<"div">>(null);

  const { data, isFetching, fetchNextPage, isLoading } = useGetCuratedPhotos({
    perPage: 25,
  });

  const { columnsCount, photosColumns } = useMemo(() => {
    if (!data) {
      return {
        columnsCount: 1,
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

  const gap = 12;
  const columnWidth = ((imagesContainerRef.current?.clientWidth ?? 1440) - gap * (columnsCount - 1)) / columnsCount;

  return (
    <Container>
      <LogoImage src={picsartLogo} alt="Picsart logo" />
      {isLoading && <PageLoader />}
      <ImagesContainer ref={imagesContainerRef}>
        {photosColumns?.map((photos, index) => (
          <Column key={index}>
            {photos.map((photo) => (
              <PhotoElement key={photo.id} columnWidth={columnWidth} photo={photo} />
            ))}
          </Column>
        ))}
      </ImagesContainer>
      <div ref={bottomElementRef} />
    </Container>
  );
};

export default Home;
