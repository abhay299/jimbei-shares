"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const uplaoder = (file: File) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const loadImageUrl = reader.result as string;
      localStorage.setItem("recent-image", loadImageUrl);
      setImageUrl(loadImageUrl);
    });
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const storedImageUrl = localStorage.getItem("recent-image") ?? "";
    setImageUrl(storedImageUrl);
  }, []);

  return (
    <div className="flex flex-col">
      <UploadDropzone
        appearance={{
          container: {
            background: "#4942E4",
            border: "2px solid #4942E4",
          },
          uploadIcon: {
            color: "#F0F0F0",
          },
          label: {
            color: "#F0F0F0",
          },
          allowedContent: {
            color: "#F0F0F0",
          },
          button: {
            color: "#F0F0F0",
            backgroundColor: "#11009E",
          },
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setImageUrl(res[0].url);
        }}
        onUploadError={(error: Error) => {
          //Do something with the error.
          alert(`Error! ${error.message}`);
        }}
      />
      {imageUrl.length ? (
        <div className="my-10">
          <Image src={imageUrl} alt="my image" width={480} height={240} />
        </div>
      ) : null}
    </div>
  );
};

export default ImageUpload;
