import { ExportIcon } from "@/icons";
import React, { useRef, useState } from "react";

const FileUpload: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState<string>("");
  
    const handleClick = () => {
      fileInputRef.current?.click();
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFileName(file.name);
      }
    };
  
    const handleDelete = () => {
      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

  return (
    <div className="flex flex-col items-start gap-2">
              {fileName ? 
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-700 w-full">
          <span>{fileName}</span>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
            aria-label="Remove file"
          >
            close
          </button>
        </div>
      :      <div
      className="flex items-center justify-between gap-3 px-3 py-2 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition w-full"
      onClick={handleClick}
    >
      <span className="text-sm text-gray-400">Attach Document</span>
      <div className="flex items-center justify-center gap-2 px-2 py-1 bg-white text-black text-sm border border-[#EAEAEA] rounded-xl hover:bg-white transition w-[7.25rem] h-[2.375rem]">
      <ExportIcon />  Upload File
      </div>
    </div> }


      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />


    </div>
  );
};

export default FileUpload;
