import { useMediaQuery } from "./useMediaQuery";
import { breakpoints } from "../data/breakpoints";

/**
 * @returns {object} - an object with the following properties:
 * - isMobile: boolean, true when the screen is 767px or narrower
 * - isTablet: boolean, true when the screen is 768px or wider
 * - isSmallDesktop: boolean, true when the screen is 1024px or wider
 * - isDesktop: boolean, true when the screen is 1280px or wider
 * - isLargeDesktop: boolean, true when the screen is 1440px or wider
 * - isMonitor: boolean, true when the screen is 1920px or wider
 * - is4k: boolean, true when the screen is 2560px or wider
 */
export function useMediaQueries() {
  const isTablet = useMediaQuery(`(min-width: ${breakpoints.tablet}px)`);
  const isSmallDesktop = useMediaQuery(`(min-width: ${breakpoints.smallDesktop}px)`);
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.desktop}px)`);
  const isLargeDesktop = useMediaQuery(`(min-width: ${breakpoints.largeDesktop}px)`);
  const isMonitor = useMediaQuery(`(min-width: ${breakpoints.monitor}px)`);
  const is4k = useMediaQuery(`(min-width: ${breakpoints["4k"]}px)`);

  return {
    isMobile: !isTablet,
    isTablet,
    isSmallDesktop,
    isDesktop,
    isLargeDesktop,
    isMonitor,
    is4k,
  };
}
