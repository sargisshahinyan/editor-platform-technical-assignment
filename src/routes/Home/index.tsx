import { ComponentRef, useEffect, useMemo, useRef } from "react";

import { useGetCuratedPhotos } from "../../api/pexel/getCuratedPhotos/useGetCuratedPhotos";
import { useMediaQueries } from "../../shared/hooks/useMediaQueries";

import { generateImagesMatrix } from "./helpers/generateImagesMatrix";

import { Column, Container, Image, ImageWrapper } from "./styles";
import { getOptimizedImageProps } from "./helpers/getOptimizedImageProps.ts";

export const Home = () => {
  const { isTablet, isSmallDesktop, isDesktop } = useMediaQueries();
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
      case isDesktop:
        columns = 5;
        break;
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
  }, [data, isTablet, isSmallDesktop, isDesktop]);

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

  const columnWidth = window.innerWidth / columnsCount;

  return (
    <>
      <Container>
        {photosColumns?.map((photos, index) => (
          <Column key={index}>
            {photos.map((photo) => (
              <ImageWrapper key={photo.id}>
                <Image {...getOptimizedImageProps(photo, columnWidth)} alt={photo.photographer} loading="lazy" />
              </ImageWrapper>
            ))}
          </Column>
        ))}
      </Container>
      <div ref={bottomElementRef} />
    </>
  );
};

export default Home;
