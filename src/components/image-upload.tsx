"use client";

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (src: String) => void;
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        uploadPreset="trademinds"
        onSuccess={(result: any) => onChange(result.info.secure_url)}
        onError={(error) => console.error("Upload failed:", error)}
      >
        <div
          className="
            p-4 
            border-4 
            border-dashed 
            border-primary/10 
            rounded-lg 
            hover:opacity-75
            transition
            flex
            flex-col
            space-y-2
            items-center
            justify-center
        "
        >
          <div className="relative h-40 w-40">
            <Image
              fill
              alt="Upload"
              src={value || "/placeholder-upload.svg"}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};
