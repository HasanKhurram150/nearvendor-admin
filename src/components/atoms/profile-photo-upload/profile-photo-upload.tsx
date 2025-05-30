import Label from "@/components/form/Label";
import { BackupIcon, TrashBinIcon } from "@/icons";
import React, { useRef, useState } from "react";

export const ProfilePhotoUpload = ({ label }: { label?: string }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <Label>{label}</Label>
      <div className="flex gap-4 items-end w-full">
        <div
          onClick={handleUploadClick}
          className="w-full h-[11.938rem] border border-dashed border-[#B1B1B1] rounded-[1.25rem] flex items-center justify-center cursor-pointer bg-white text-[0.75rem] text-[#555] font-semibold"
        >
          {imagePreview ? (
            <div className="overflow-hidden h-full w-full relative">
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-full h-full object-cover rounded-[1.25rem]"
              />

              <button
                onClick={handleDelete}
                className="p-2 bg-white rounded-3xl absolute top-2 right-2"
              >
                <TrashBinIcon />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <BackupIcon />
              <div className="flex gap-1">
                <p className="text-[#102445] text-sm font-medium">
                  Drag your file(s) or
                </p>{" "}
                <p className="text-[#B1B1B1] text-sm font-semibold">browse</p>
              </div>
              <p className="text-[#6D6D6D] text-sm ">
                Max 10 MB files are allowed
              </p>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
