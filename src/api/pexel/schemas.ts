import { z } from "zod";

export const PhotoSchema = z
  .object({
    id: z.number(),
    width: z.number(),
    height: z.number(),
    url: z.string(),
    photographer: z.string(),
    photographer_url: z.string(),
    photographer_id: z.number(),
    avg_color: z.string(),
    src: z.object({
      original: z.string(),
      large2x: z.string(),
      large: z.string(),
      medium: z.string(),
      small: z.string(),
      portrait: z.string(),
      landscape: z.string(),
      tiny: z.string(),
    }),
    alt: z.string(),
  })
  // to camelCase keys
  .transform((data) => ({
    id: data.id,
    width: data.width,
    height: data.height,
    url: data.url,
    photographer: data.photographer,
    photographerUrl: data.photographer_url,
    photographerId: data.photographer_id,
    avgColor: data.avg_color,
    src: {
      original: data.src.original,
      large2x: data.src.large2x,
      large: data.src.large,
      medium: data.src.medium,
      small: data.src.small,
      portrait: data.src.portrait,
      landscape: data.src.landscape,
      tiny: data.src.tiny,
    },
    alt: data.alt,
  }));

export const PhotosListApiResponseSchema = z
  .object({
    page: z.number(),
    per_page: z.number(),
    photos: PhotoSchema.array(),
    prev_page: z.string().optional(),
    next_page: z.string().optional(),
  })
  .transform((data) => ({
    page: data.page,
    perPage: data.per_page,
    photos: data.photos,
    prevPage: data.prev_page,
    nextPage: data.next_page,
  }));
