import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { error } from "console";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 

 

export const ourFileRouter = {
 
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
   
    .middleware(async ({ req }) => {
 
      const {getUser} = getKindeServerSession()
      const user = await getUser()
      if(!user||!user.id) throw new Error("Unauthorized")
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      // return { uploadedBy: metadata.userId };
        const createdFile = await db.file.create({
          data:{
            key: file.key,
            name: file.name,
            userId: metadata.userId,
            url:`https://uploadthind-prod.s3.us-west-2.amazonaws.com/${file.key}`,
            uploadStatus: "PROCESSING",
          }
        })


    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;