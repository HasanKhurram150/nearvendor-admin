"use client";
import Label from "@/components/form/Label";
import { BackupIcon, TrashBinIcon } from "@/icons";
import React, { useRef, useState } from "react";

interface CSVFileUploadProps {
  label?: string;
  onFileChange: (file: File) => void;
}

export const CSVFileUpload = ({ label, onFileChange }: CSVFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setFileName(file.name);
      onFileChange(file);
    } else {
      setFileName(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      alert("Please upload a valid CSV file.");
    }
  };

  const handleDelete = () => {
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {label && <Label>{label}</Label>}
      <div className="flex gap-4 items-end w-full">
        {fileName ? (
          <div className="w-full h-[4rem] border border-dashed border-[#B1B1B1] rounded-[1.25rem] flex items-center justify-between cursor-pointer bg-white px-3 text-[0.75rem] text-[#555] font-semibold">
            <p className="text-[#102445] text-base font-medium break-all">
              {fileName}
            </p>
            <button
              onClick={handleDelete}
              className="p-0 bg-white rounded-3xl top-2 right-2"
            >
              <TrashBinIcon />
            </button>
          </div>
        ) : (
          <div
            onClick={handleUploadClick}
            className="w-full h-[11.938rem] border border-dashed border-[#B1B1B1] rounded-[1.25rem] flex items-center justify-center cursor-pointer bg-white text-[0.75rem] text-[#555] font-semibold"
          >
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <BackupIcon />
              <div className="flex gap-1">
                <p className="text-[#102445] text-sm font-medium">
                  Drag your file or
                </p>
                <p className="text-[#B1B1B1] text-sm font-semibold">browse</p>
              </div>
              <p className="text-[#6D6D6D] text-sm">
                Only CSV files up to 10 MB
              </p>
            </div>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".csv,text/csv"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};