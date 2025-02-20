import { useQuery } from "@tanstack/react-query";

import { getPhoto } from "./index";

export const useGetPhoto = (...[photoId]: Parameters<typeof getPhoto>) => {
  return useQuery({
    queryKey: ["getPhoto", photoId],
    queryFn: () => getPhoto(photoId),
  });
};
