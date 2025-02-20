import { useMediaQuery } from "./useMediaQuery";

export const breakpoints = {
  tablet: 768,
  smallDesktop: 1024,
  desktop: 1440,
  largeDesktop: 1920,
  ["4k"]: 2560,
};

/**
 * @returns {object} - an object with the following properties:
 * - isMobile: boolean, true when the screen is 767px or narrower
 * - isTablet: boolean, true when the screen is 768px or wider
 * - isSmallDesktop: boolean, true when the screen is 1024px or wider
 * - isDesktop: boolean, true when the screen is 1440px or wider
 * - isLargeDesktop: boolean, true when the screen is 1920px or wider
 * - is4k: boolean, true when the screen is 2560px or wider
 */
export function useMediaQueries() {
  const isTablet = useMediaQuery(`(min-width: ${breakpoints.tablet}px)`);
  const isSmallDesktop = useMediaQuery(`(min-width: ${breakpoints.smallDesktop}px)`);
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.desktop}px)`);
  const isLargeDesktop = useMediaQuery(`(min-width: ${breakpoints.largeDesktop}px)`);
  const is4k = useMediaQuery(`(min-width: ${breakpoints["4k"]}px)`);

  return {
    isMobile: !isTablet,
    isTablet,
    isSmallDesktop,
    isDesktop,
    isLargeDesktop,
    is4k,
  };
}
