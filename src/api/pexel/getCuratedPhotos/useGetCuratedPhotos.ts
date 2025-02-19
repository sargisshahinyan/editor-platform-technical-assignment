import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { getCuratedPhotos } from "./index";

export const useGetCuratedPhotos = (...[{ page, perPage }]: Parameters<typeof getCuratedPhotos>) => {
  return useInfiniteQuery({
    queryKey: ["curatedPhotos", { page, perPage }],
    queryFn: ({ pageParam: { page, perPage } }) => getCuratedPhotos({ page, perPage }),
    getNextPageParam: (data) => {
      if (data.nextPage) {
        const url = new URL(data.nextPage);
        const searchParams = url.searchParams;
        return {
          page: Number(searchParams.get("page")),
          perPage: Number(searchParams.get("per_page")),
        };
      }

      return undefined;
    },
    getPreviousPageParam: (data) => {
      if (data.prevPage) {
        const url = new URL(data.prevPage);
        const searchParams = url.searchParams;
        return {
          page: Number(searchParams.get("page")),
          perPage: Number(searchParams.get("per_page")),
        };
      }

      return undefined;
    },
    initialPageParam: { page, perPage },
    placeholderData: keepPreviousData,
  });
};
