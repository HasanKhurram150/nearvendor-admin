// import { ExportIcon } from "@/icons";
// import React, { useRef, useState } from "react";

// interface FileUploadProps {
//   value?: File | null;
//   onChange: (file: File | null) => void;
//   accept?: string;
//   maxSize?: number; // in bytes
//   disabled?: boolean;
//   multiple?: boolean;
// }

// const FileUpload: React.FC<FileUploadProps> = ({
//   value,
//   onChange,
//   accept = "*",
//   maxSize = 5 * 1024 * 1024, // 5MB default
//   disabled = false,
//   multiple = false,
// }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleClick = () => {
//     if (!disabled) {
//       fileInputRef.current?.click();
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     setError(null);

//     if (!file) {
//       onChange(null);
//       return;
//     }

//     // Validate file size
//     if (file.size > maxSize) {
//       const sizeInMB = (maxSize / (1024 * 1024)).toFixed(2);
//       setError(`File size exceeds ${sizeInMB}MB limit`);
//       return;
//     }

//     // Validate file type if accept is specified
//     if (accept !== "*") {
//       const acceptedTypes = accept.split(",").map(type => type.trim());
//       const fileExtension = file.name.split('.').pop()?.toLowerCase();
//       const fileType = file.type.toLowerCase();

//       const isValid = acceptedTypes.some(type => {
//         const typeLower = type.toLowerCase();
//         return (
//           typeLower === `.${fileExtension}` ||
//           typeLower === fileType ||
//           typeLower === `${fileType}/*` ||
//           typeLower === `*.${fileExtension}`
//         );
//       });

//       if (!isValid) {
//         setError(`Invalid file type. Accepted: ${accept}`);
//         return;
//       }
//     }

//     onChange(file);
//   };

//   const handleDelete = () => {
//     onChange(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const fileName = value?.name || "";

//   return (
//     <div className="flex flex-col items-start gap-2 w-full">
//       {fileName ? (
//         <div className="flex items-center justify-between gap-2 mt-1 text-sm text-gray-700 dark:text-gray-300 w-full">
//           <span className="truncate max-w-[200px]">{fileName}</span>
//           {!disabled && (
//             <button
//               onClick={handleDelete}
//               className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
//               aria-label="Remove file"
//               type="button"
//             >
//               Remove
//             </button>
//           )}
//         </div>
//       ) : (
//         <div
//           className={`flex items-center justify-between gap-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl transition w-full
//             ${
//               disabled
//                 ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
//                 : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
//             }`}
//           onClick={handleClick}
//         >
//           <span className="text-sm text-gray-400 dark:text-gray-400">
//             Attach Document
//           </span>
//           <div
//             className={`flex items-center justify-center gap-2 px-2 py-1 text-sm border rounded-xl transition w-[7.25rem] h-[2.375rem]
//               ${
//                 disabled
//                   ? "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-500"
//                   : "bg-white dark:bg-gray-800 text-black dark:text-white border-[#EAEAEA] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
//               }`}
//           >
//             <ExportIcon /> Upload File
//           </div>
//         </div>
//       )}

//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         className="hidden"
//         accept={accept}
//         multiple={multiple}
//         disabled={disabled}
//       />

//       {error && (
//         <p className="mt-1 text-sm text-error-500 dark:text-error-400">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// };

// export default FileUpload;

import { ExportIcon } from "@/icons";
import React, { useRef, useState } from "react";

interface FileUploadProps {
  value?: File | null;
  onChange: (file: File | null, url?: string) => void; // Updated to include URL
  accept?: string;
  maxSize?: number; // in bytes
  disabled?: boolean;
  multiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  accept = "*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  disabled = false,
  multiple = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  const uploadToBucket = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `https://devent-backend-303118176388.us-west1.run.app/v1/api/media/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (result.data) {
        return result.data.url;
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) {
      onChange(null);
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      const sizeInMB = (maxSize / (1024 * 1024)).toFixed(2);
      setError(`File size exceeds ${sizeInMB}MB limit`);
      return;
    }

    // Validate file type if accept is specified
    if (accept !== "*") {
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const fileType = file.type.toLowerCase();

      const isValid = acceptedTypes.some((type) => {
        const typeLower = type.toLowerCase();
        return (
          typeLower === `.${fileExtension}` ||
          typeLower === fileType ||
          typeLower === `${fileType}/*` ||
          typeLower === `*.${fileExtension}`
        );
      });

      if (!isValid) {
        setError(`Invalid file type. Accepted: ${accept}`);
        return;
      }
    }

    try {
      setIsUploading(true);
      const fileUrl = await uploadToBucket(file);
      onChange(file, fileUrl);
    } catch (error) {
      setError("Upload failed. Please try again.");
      onChange(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fileName = value?.name || "";

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {fileName ? (
        <div className="flex items-center justify-between gap-2 mt-1 text-sm text-gray-700 dark:text-gray-300 w-full">
          <span className="truncate max-w-[200px]">{fileName}</span>
          {!disabled && !isUploading && (
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
              aria-label="Remove file"
              type="button"
            >
              Remove
            </button>
          )}
        </div>
      ) : (
        <div
          className={`flex items-center justify-between gap-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl transition w-full
            ${
              disabled || isUploading
                ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          onClick={handleClick}
        >
          <span className="text-sm text-gray-400 dark:text-gray-400">
            {isUploading ? "Uploading..." : "Attach Document"}
          </span>
          <div
            className={`flex items-center justify-center gap-2 px-2 py-1 text-sm border rounded-xl transition w-[7.25rem] h-[2.375rem]
              ${
                disabled || isUploading
                  ? "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-500"
                  : "bg-white dark:bg-gray-800 text-black dark:text-white border-[#EAEAEA] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
          >
            <ExportIcon /> {isUploading ? "..." : "Upload File"}
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={accept}
        multiple={multiple}
        disabled={disabled || isUploading}
      />

      {error && (
        <p className="mt-1 text-sm text-error-500 dark:text-error-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
