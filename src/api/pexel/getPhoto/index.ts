import { apiInstance } from "../apiInstance";
import { PhotoSchema } from "../schemas";

export const getPhoto = async (photoId: number) => {
  const { data } = await apiInstance.get(`/photos/${photoId}`);

  return PhotoSchema.parse(data);
};
