"use client";
import { ChangeEvent, useRef, useState } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@radix-ui/themes";
import axios from "axios";
const ImageUpload = ({
  name,
  icon,
  defaultValue,
}: {
  name: string;
  icon: IconDefinition;
  defaultValue?: string;
}) => {
  const fileInRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(defaultValue || null); // Use defaultValue as the initial state

  const handleUploads = async (ev: ChangeEvent<HTMLInputElement>) => {
    const input = ev.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      setPreview(URL.createObjectURL(file)); // Convert file to URL for preview

      const data = new FormData();
      data.append("image", file);

      // Here you can implement the image upload functionality, such as making an API call to upload the image
    }
  };

  return (
    <div className="image-upload">
      <div className="bg-gray-100 rounded-md size-24 inline-flex items-center justify-center">
        {preview ? (
          <img src={preview} alt="Preview" className="size-24 rounded-md" />
        ) : (
          <img src={defaultValue} alt="Default" className="size-24 rounded-md" />
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