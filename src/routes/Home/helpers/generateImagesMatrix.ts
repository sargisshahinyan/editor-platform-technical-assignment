import { Photo } from "../../../api/pexel/schemas";

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

  for (const [index, photo] of normalizedPhotos.entries()) {
    const shortestColumnIndex = smallestItemIndex(columnHeights);
    // take the original photo entry, to have the origin height value
    matrix[shortestColumnIndex].push(photos[index]);
    columnHeights[shortestColumnIndex] += photo.height;
  }

  return matrix;
};
