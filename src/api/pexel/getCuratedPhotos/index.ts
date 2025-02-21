import { apiInstance } from "../apiInstance";
import { PhotosListApiResponseSchema } from "../schemas";

interface GetCuratedPhotosParams {
  page?: number;
  perPage?: number;
}

export const getCuratedPhotos = async ({ page = 1, perPage }: GetCuratedPhotosParams) => {
  const { data } = await apiInstance.get("/curated", {
    params: {
      page,
      per_page: perPage,
    },
  });

  return PhotosListApiResponseSchema.parse(data);
};
