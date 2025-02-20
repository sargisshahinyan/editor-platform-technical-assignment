import { useMemo } from "react";

import { useGetCuratedPhotos } from "../../api/pexel/getCuratedPhotos/useGetCuratedPhotos";
import { useMediaQueries } from "../../shared/hooks/useMediaQueries";

import { generateImagesMatrix } from "./helpers/generateImagesMatrix";

import { Column, Container, Image, ImageWrapper } from "./styles";

export const Home = () => {
  const { isTablet, isSmallDesktop, isDesktop } = useMediaQueries();

  const { data } = useGetCuratedPhotos({
    perPage: 25,
  });

  const photosColumns = useMemo(() => {
    if (!data) {
      return undefined;
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

    return generateImagesMatrix(photos, columns);
  }, [data, isTablet, isSmallDesktop, isDesktop]);

  return (
    <Container>
      {photosColumns?.map((photos, index) => (
        <Column key={index}>
          {photos.map((photo) => (
            <ImageWrapper key={photo.id}>
              <Image
                srcSet={`${photo.src.small} 768w, ${photo.src.medium} 1920w, ${photo.src.original} 2560w`}
                src={photo.src.medium}
                alt={photo.photographer}
                loading="lazy"
              />
            </ImageWrapper>
          ))}
        </Column>
      ))}
    </Container>
  );
};

export default Home;
