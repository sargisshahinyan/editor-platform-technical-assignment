import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { getCuratedPhotos, searchPhotos } from "./index";

interface GetPhotosParams {
  page?: number;
  perPage?: number;
  query?: string;
}

export const useGetPhotos = ({ page, perPage, query }: GetPhotosParams) => {
  return useInfiniteQuery({
    queryKey: ["curatedPhotos", { page, perPage, query }],
    queryFn: ({ pageParam: { page, perPage } }) => {
      if (query) {
        return searchPhotos({ query, page, perPage });
      }

      return getCuratedPhotos({ page, perPage });
    },
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
