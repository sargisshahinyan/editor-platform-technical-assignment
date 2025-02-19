import { Photo } from "../../../api/pexel/schemas.ts";

const normalizePhotos = (photos: Array<Photo>) => {
  return photos.map((photo) => ({
    ...photo,
    height: photo.height / photo.width,
  }));
};

const smallestItemIndex = (arr: Array<number>) => {
  let smallestIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[smallestIndex]) {
      smallestIndex = i;
    }
  }

  return smallestIndex;
};

export const generateImagesMatrix = (photos: Array<Photo>, columnsCount = 5) => {
  const normalizedPhotos = normalizePhotos(photos);

  const matrix = Array.from({ length: columnsCount }, () => [] as Array<Photo>);
  const columnHeights = Array.from({ length: columnsCount }, () => 0);

  for (const photo of normalizedPhotos) {
    const index = smallestItemIndex(columnHeights);
    matrix[index].push(photo);
    columnHeights[index] += photo.height;
  }

  return matrix;
};
