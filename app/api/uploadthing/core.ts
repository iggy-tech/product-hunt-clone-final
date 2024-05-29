
import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();



export const ourFileRouter = {
  productLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      return { ...req };

  
    })
    .onUploadComplete(() => {}),

  productImages: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .middleware(async ({ req }) => {
      return { ...req };
    })
    .onUploadComplete(() => {}),
};




export type OurFileRouter = typeof ourFileRouter;