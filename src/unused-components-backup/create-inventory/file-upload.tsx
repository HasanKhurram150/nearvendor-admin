// import { ExportIcon } from "@/icons";
// import React, { useRef, useState } from "react";
// import { API_KEY, BASE_URL } from "@/config";
// import { useLanguage } from "../common/LanguageContext";

// interface FileUploadProps {
//   value?: File | null;
//   onChange: (url: string) => void; // Updated to include URL
//   accept?: string;
//   maxSize?: number;
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
//   const { t } = useLanguage();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isUploading, setIsUploading] = useState(false);

//   const handleClick = () => {
//     if (!disabled && !isUploading) {
//       fileInputRef.current?.click();
//     }
//   };

//   const uploadToBucket = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch(`${BASE_URL}/media/upload`, {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (result.data) {
//         return result.data.url;
//       } else {
//         throw new Error("Upload failed");
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     setError(null);

//     if (!file) {
//       onChange("");
//       return;
//     }

//     // Validate file size

//     if (file.size > maxSize) {
//       const sizeInMB = (maxSize / (1024 * 1024)).toFixed(2);
//       setError(`File size exceeds ${sizeInMB}MB limit`);
//       return;
//     }

//     const acceptedTypes = accept.split(",").map((type) => type.trim());
//     const fileType = file.type; // e.g., "image/jpeg" or "video/mp4"

//     const isValid = acceptedTypes.some((type) => {
//       if (type.endsWith("/*")) {
//         // This handles "image/*"
//         const baseType = type.replace("/*", "");
//         return fileType.startsWith(baseType);
//       }
//       // This handles "video/mp4"
//       return fileType === type;
//     });

//     if (!isValid) {
//       setError(`Invalid file type. Please upload an image or a .mp4 video.`);
//       return;
//     }

//     try {
//       setIsUploading(true);
//       const fileUrl = await uploadToBucket(file);
//       onChange(fileUrl);
//     } catch (error) {
//       setError("Upload failed. Please try again.");
//       onChange("");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleDelete = () => {
//     onChange("");
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
//           {!disabled && !isUploading && (
//             <button
//               onClick={handleDelete}
//               className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
//               aria-label="Remove file"
//               type="button"
//             >
//               {t("remove")}
//             </button>
//           )}
//         </div>
//       ) : (
//         <div
//           className={`flex items-center justify-between gap-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl transition w-full
//             ${
//               disabled || isUploading
//                 ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
//                 : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
//             }`}
//           onClick={handleClick}
//         >
//           <span className="text-sm text-gray-400 dark:text-gray-400">
//             {isUploading ? t("uploading") : t("attachDocument")}
//           </span>
//           <div
//             className={`flex items-center justify-center gap-2 px-2 py-1 text-sm border rounded-xl transition w-[7.25rem] h-[2.375rem]
//               ${
//                 disabled || isUploading
//                   ? "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-500"
//                   : "bg-white dark:bg-gray-800 text-black dark:text-white border-[#EAEAEA] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
//               }`}
//           >
//             <ExportIcon /> {isUploading ? "..." : t("uploadFile")}
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
//         disabled={disabled || isUploading}
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
