// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  artistMedia: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    video: { maxFileSize: "32MB", maxFileCount: 3 },
  }).onUploadComplete(async ({ file }) => {
    return {
      url: file.url,
    };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;