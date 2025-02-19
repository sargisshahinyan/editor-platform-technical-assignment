import { useMemo } from "react";

import { useGetCuratedPhotos } from "../../api/pexel/getCuratedPhotos/useGetCuratedPhotos.ts";

import { generateImagesMatrix } from "./helpers/generateImagesMatrix.ts";

import { Column, Container, Image, ImageWrapper } from "./styles";

export const Home = () => {
  const { data } = useGetCuratedPhotos({
    perPage: 25,
  });

  const photosColumns = useMemo(() => {
    if (!data) {
      return undefined;
    }

    const photos = data.pages.flatMap((page) => page.photos);

    return generateImagesMatrix(photos);
  }, [data]);

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
