"use client";
import { ChangeEvent, useRef, useState } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@radix-ui/themes";
import axios from "axios";

const ImageUpload = ({
  name,
  icon,
}: {
  name: string;
  icon: IconDefinition;
}) => {
  const fileInRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null); // ✅ Store file URL instead of file object

  const handleUploads = async (ev: ChangeEvent<HTMLInputElement>) => {
    const input = ev.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      setPreview(URL.createObjectURL(file)); // ✅ Convert file to URL for preview

      const data = new FormData();
      data.append("image", file);

      // try {
      //   const response = await axios.post("/api/uploads", data, {
      //     // headers: {
      //     //   "Content-Type": "multipart/form-data",
      //     // },
      //   });

      //   console.log("Upload successful:", response.data);
      // } catch (error) {
      //   console.error("Upload failed:", error);
      // }
    }
  };

  return (
    <div className="">
      <div className="bg-gray-100 rounded-md size-24 inline-flex items-center justify-center">
        {preview ? (
          <img src={preview} alt="Preview" className="size-24 rounded-md" />
        ) : (
          <FontAwesomeIcon icon={icon} className="text-gray-400" />
        )}
      </div>

      <input
        type="file"
        ref={fileInRef}
        hidden
        accept="image/*"
        name={name}
        id={name}
        onChange={handleUploads}
      />
      <div className="mt-2">
        <Button variant="soft" onClick={() => fileInRef.current?.click()}>
          Select file
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
