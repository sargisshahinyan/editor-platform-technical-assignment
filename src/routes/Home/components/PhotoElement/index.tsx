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
    <PhotoElementWrapper
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      ref={imgWrapperRef}
      key={photo.id}
      to={`/photos/${photo.id}`}
      aria-label={photo.alt}
    >
      {!isImageLoaded && <Placeholder />}
      {isVisible && (
        <Image
          $transparent={!isImageLoaded}
          onLoad={() => setIsImageLoaded(true)}
          src={src}
          srcSet={srcSet}
          width={width}
          height={height}
          sizes="(max-width: 767px) 50vw, (min-width: 768px) and (max-width: 1024px) 33.3vw, 25vw"
          alt={photo.photographer}
        />
      )}
    </PhotoElementWrapper>
  );
};
