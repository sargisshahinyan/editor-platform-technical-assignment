import { useQuery } from "@tanstack/react-query";

import { getPhoto } from "./index";

export const useGetPhoto = (photoId?: number) => {
  return useQuery({
    queryKey: ["getPhoto", photoId],
    queryFn: photoId ? () => getPhoto(photoId) : undefined,
    enabled: !!photoId,
  });
};
