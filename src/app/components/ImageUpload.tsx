import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@radix-ui/themes";
import React, { useRef } from "react";
const ImageUpload = ({
  name,
  icon,
}: //   defaultValue = "",
{
  name: string;
  icon: IconDefinition;
  //   defaultValue: string;
}) => {
  const fileInRef = useRef<HTMLInputElement>(null);

  return (
    <div className="">
      <div className="bg-gray-100 rounded-md size-24 inline-flex items-center content-center justify-center">
        <FontAwesomeIcon icon={icon} className="text-gray-400" />
      </div>

      <input
        type="file"
        ref={fileInRef}
        hidden
        accept="image/*"
        name={name}
        id={name}
      />
      <div className="">
        <Button variant="soft" onClick={() => fileInRef.current?.click()}>
          Select file
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
