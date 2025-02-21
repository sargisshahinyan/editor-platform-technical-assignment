import { ComponentRef, useEffect, useRef, useState } from "react";

import { Photo } from "../../../../api/pexel/schemas";

import { getOptimizedImageProps } from "../../helpers/getOptimizedImageProps";

import { Image, PhotoElementWrapper } from "./styles";

export const PhotoElement = ({ columnWidth, photo }: { columnWidth: number; photo: Photo }) => {
  const imgWrapperRef = useRef<ComponentRef<"a">>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "500px 0px 500px 0px" },
    );

    if (imgWrapperRef.current) observer.observe(imgWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const { src, srcSet, width, height } = getOptimizedImageProps(photo, columnWidth);

  return (
    <PhotoElementWrapper width={width} height={height} ref={imgWrapperRef} key={photo.id} to={`/photos/${photo.id}`}>
      {isVisible && <Image src={src} srcSet={srcSet} width={width} height={height} alt={photo.photographer} />}
    </PhotoElementWrapper>
  );
};
