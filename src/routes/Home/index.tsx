import { ComponentRef, useEffect, useMemo, useRef, useState } from "react";

import { useGetCuratedPhotos } from "../../api/pexel/getCuratedPhotos/useGetCuratedPhotos";
import { useMediaQueries } from "../../shared/hooks/useMediaQueries";

import { generateImagesMatrix } from "./helpers/generateImagesMatrix";

import { PhotoElement } from "./components/PhotoElement";
import { PicsArtLogo } from "../../shared/components/PicsArtLogo";

import { Column, Container, Header, ImagesContainer, PageLoader, SearchInput } from "./styles";

export const Home = () => {
  const { isTablet, isSmallDesktop } = useMediaQueries();
  const imagesContainerRef = useRef<ComponentRef<"div">>(null);
  const bottomElementRef = useRef<ComponentRef<"div">>(null);
  const [imagesContainerSize, setImagesContainerSize] = useState(1440);

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

    const photosIds = new Set<number>();
    const photos = data.pages
      .flatMap((page) => page.photos)
      .filter((photo) => {
        if (photosIds.has(photo.id)) {
          return false;
        }
        photosIds.add(photo.id);
        return true;
      });

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

  useEffect(() => {
    if (!imagesContainerRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      if (!imagesContainerRef.current) {
        return;
      }

      setImagesContainerSize(imagesContainerRef.current.clientWidth);
    });
    resizeObserver.observe(imagesContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const gap = 12;
  const columnWidth = (imagesContainerSize - gap * (columnsCount - 1)) / columnsCount;

  return (
    <Container>
      <Header>
        <PicsArtLogo />
        <SearchInput placeholder="Search free high-resolution photos" />
      </Header>
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
