'use client'

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";

interface ImagesUploaderProps {
  onChange: (urls: string[]) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const ImagesUploader = ({ onChange, endpoint }: ImagesUploaderProps) => {
  const handleUploadComplete = (res: { url: string }[]) => {
    const urls = res.map((item) => item.url);
    onChange(urls);
  };

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={handleUploadComplete}
      onUploadError={(error: Error) => {
        toast(error.message, { position: "top-center" });
      }}
    />
  );
};