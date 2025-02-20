import { breakpoints } from "../../../shared/data/breakpoints";

import { Photo } from "../../../api/pexel/schemas";

const addOptimisationParams = (url: string, width: number) => {
  const urlObject = new URL(url);
  urlObject.searchParams.set("auto", "compress");
  urlObject.searchParams.set("cs", "tinysrgb");
  urlObject.searchParams.set("w", String(width));

  return urlObject.toString();
};

export const getOptimizedImageProps = (photo: Photo, width: number) => {
  const src = photo.src.medium;
  const originalUrl = photo.src.original;
  const srcSet = Object.values(breakpoints)
    .map((breakpoint) => `${addOptimisationParams(originalUrl, breakpoint)} ${breakpoint}w`)
    .join(",");

  return {
    src,
    srcSet,
    width,
    height: (photo.height / photo.width) * width,
  };
};
