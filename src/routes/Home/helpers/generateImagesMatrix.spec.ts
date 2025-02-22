import { describe, it, expect } from "vitest";
import { generateImagesMatrix } from "./generateImagesMatrix";
import { Photo } from "../../../api/pexel/schemas";

// Mock Photo type for testing
const mockPhoto = (id: number, width: number, height: number): Photo => ({
  id,
  width,
  height,
  url: `https://example.com/photo${id}`,
  photographer: "Test Photographer",
  photographerId: 1,
  photographerUrl: "https://example.com/photographer",
  avgColor: "#000000",
  src: {
    original: `https://example.com/photo${id}.jpg`,
    large: "",
    large2x: "",
    medium: "",
    small: "",
    portrait: "",
    landscape: "",
    tiny: "",
  },
  alt: `Photo ${id}`,
});

describe("generateImagesMatrix", () => {
  it("distributes photos into specified number of columns", () => {
    const photos: Photo[] = [
      mockPhoto(1, 100, 200), // height: 2
      mockPhoto(2, 100, 300), // height: 3
      mockPhoto(3, 100, 100), // height: 1
      mockPhoto(4, 100, 400), // height: 4
      mockPhoto(5, 100, 150), // height: 1.5
    ];
    const columnsCount = 3;
    const matrix = generateImagesMatrix(photos, columnsCount);

    expect(matrix.length).toBe(columnsCount);
    expect(matrix.flat().length).toBe(photos.length); // All photos distributed
  });

  it("places photos in shortest column based on normalized height", () => {
    const photos: Photo[] = [
      mockPhoto(1, 100, 200), // height: 2
      mockPhoto(2, 100, 300), // height: 3
      mockPhoto(3, 100, 100), // height: 1
    ];
    const matrix = generateImagesMatrix(photos, 2);

    // Expected distribution:
    // Column 0: [Photo 1 (2), Photo 3 (1)] -> Total height: 3
    // Column 1: [Photo 2 (3)] -> Total height: 3
    expect(matrix[0]).toContain(photos[0]);
    expect(matrix[0]).toContain(photos[2]);
    expect(matrix[1]).toContain(photos[1]);
  });

  it("uses original photo objects in matrix", () => {
    const photos: Photo[] = [mockPhoto(1, 100, 200)];
    const matrix = generateImagesMatrix(photos, 1);
    expect(matrix[0][0]).toBe(photos[0]); // Reference equality
    expect(matrix[0][0].height).toBe(200); // Original height preserved
  });

  it("handles empty photo array", () => {
    const matrix = generateImagesMatrix([], 3);
    expect(matrix).toEqual([[], [], []]);
  });

  it("defaults to 5 columns if columnsCount not provided", () => {
    const photos: Photo[] = [mockPhoto(1, 100, 200)];
    const matrix = generateImagesMatrix(photos);
    expect(matrix.length).toBe(5);
    expect(matrix[0]).toContain(photos[0]);
  });

  it("handles more columns than photos", () => {
    const photos: Photo[] = [mockPhoto(1, 100, 200)];
    const matrix = generateImagesMatrix(photos, 3);
    expect(matrix.length).toBe(3);
    expect(matrix[0].length).toBe(1);
    expect(matrix[1].length).toBe(0);
    expect(matrix[2].length).toBe(0);
  });
});
