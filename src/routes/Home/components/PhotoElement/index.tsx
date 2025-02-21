import { ComponentRef, useEffect, useRef, useState } from "react";

import { Photo } from "../../../../api/pexel/schemas";

import { getOptimizedImageProps } from "../../helpers/getOptimizedImageProps";

import { Image, PhotoElementWrapper, Placeholder } from "./styles";

export const PhotoElement = ({ columnWidth, photo }: { columnWidth: number; photo: Photo }) => {
  const imgWrapperRef = useRef<ComponentRef<"a">>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        setIsVisible(isVisible);
        if (!isVisible) {
          setIsImageLoaded(false);
        }
      },
      { rootMargin: "500px 0px 500px 0px" },
    );

    if (imgWrapperRef.current) observer.observe(imgWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const { src, srcSet, width, height } = getOptimizedImageProps(photo, columnWidth);

  return (
    <PhotoElementWrapper width={width} height={height} ref={imgWrapperRef} key={photo.id} to={`/photos/${photo.id}`}>
      {!isImageLoaded && <Placeholder />}
      {isVisible && (
        <Image
          $transparent={!isImageLoaded}
          onLoad={() => setIsImageLoaded(true)}
          src={src}
          srcSet={srcSet}
          width={width}
          height={height}
          alt={photo.photographer}
        />
      )}
    </PhotoElementWrapper>
  );
};
