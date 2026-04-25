// "use client";
// import { AddCategoryIcon } from "@/icons";
// import React from "react";
// import * as Yup from "yup";
// import {
//   Controller,
//   useForm,
//   FieldError,
//   FieldErrorsImpl,
//   Merge,
// } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import toast from "react-hot-toast";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";
// import GenericButton from "../atoms/generic-button/generic-button";
// import GenericSelectDropdown from "../atoms/generic-select-dropdown/generic-select-dropdown";
// import { CSVFileUpload } from "../atoms/csv-file-upload";
// import { ApiErrorResponse } from "@/services/auth/auth-api/auth-api.types";
// import Loading from "../atoms/loading/loading";
// // import { useProcessEventCSVMutation } from "@/services/events-management-api";
// // import { useGetCategoriesQuery } from "@/services/categories-api";
// import { useLanguage } from "../common/LanguageContext";

// // Type-safe error message extractor
// const getError = (
//   error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
// ): string | undefined => {
//   return error?.message?.toString();
// };

// interface UploadCSVFormValues {
//   eventName: string;
//   categoryId: string;
//   file: File | null;
// }

// const validationSchema = Yup.object().shape({
//   eventName: Yup.string()
//     .required("Event name is required")
//     .max(100, "Event name must be at most 100 characters"),
//   categoryId: Yup.string().required("Category is required"),
//   file: Yup.mixed<File>()
//     .required("CSV file is required")
//     .test("fileType", "Only CSV files are allowed", (value) => {
//       return value && value.type === "text/csv";
//     })
//     .test("fileSize", "File size must be less than 10MB", (value) => {
//       return value && value.size <= 10 * 1024 * 1024; // 10MB
//     }),
// });

// export const UploadCSVModal = ({ onClose }: { onClose: () => void }) => {
//   const { t } = useLanguage();
//   // const [uploadEventCSV, { isLoading }] = useProcessEventCSVMutation();
//   // const { data: categories, isLoading: isCategoryLoading } =
//   //   useGetCategoriesQuery({});
//   const [uploadEventCSV, { isLoading }] = [
//     async (...args: any[]) => ({ unwrap: () => {} }),
//     { isLoading: false },
//   ];
//   const categories: any[] = [];
//   const isCategoryLoading = false;

//   // console.log("this is categories...", categories);

//   const technologyCategories =
//     categories
//       ?.filter((category) => category?.type === "technology")
//       ?.map((category) => ({
//         label: category?.name,
//         value: category?.id,
//       })) || [];

//   const defaultCategoryId = technologyCategories[0]?.value || "";

//   const {
//     control,
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<any>({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       eventName: "",
//       categoryId: defaultCategoryId,
//       file: null,
//     },
//     mode: "onChange",
//     // shouldFocusError: false, // Add this
//     // shouldUnregister: true, // Add this
//   });

//   const handleFileChange = (selectedFile: File) => {
//     setValue("file", selectedFile, { shouldValidate: true });
//   };

//   const onSubmit = async (data: UploadCSVFormValues) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", data.file as File);
//       // Add other fields if needed
//       formData.append("eventName", data?.eventName);
//       formData.append("categoryId", data?.categoryId);

//       const response = await uploadEventCSV(formData).unwrap();
//       toast.success("CSV file uploaded successfully!");
//       console.log("Upload response:", response);
//       onClose();
//     } catch (error) {
//       console.error("Upload failed:", error);
//       const apiError = error as ApiErrorResponse;
//       toast.error(
//         apiError.data?.message ||
//           "Failed to upload CSV file. Please try again.",
//       );
//     }
//   };

//   const getErrorMessage = (error?: FieldError) => {
//     return error?.message?.toString();
//   };

//   return (
//     <div className="flex flex-col items-start gap-[2.5rem] w-full">
//       <div className="flex justify-start items-center gap-4">
//         {/* <AddCategoryIcon /> */}
//         <p className="font-semibold text-[#102445] text-[1.25rem] dark:text-white">
//           {t("uploadCSV")}
//         </p>
//       </div>

//       {isCategoryLoading ? (
//         <div className="flex justify-center items-center w-full h-[300px]">
//           <Loading size="lg" className="border-[#FFFF00]" />
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit(onSubmit)} className="w-full">
//           <div className="space-y-6 py-2 w-full max-h-[40rem] overflow-y-auto">
//             <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
//               <div>
//                 <p className="invisible">
//                   Only Technology category type side events is accepted
//                 </p>
//                 <Label htmlFor="eventName">{t("eventName")}</Label>
//                 <Input
//                   id="eventName"
//                   placeholder={t("enterEventName")}
//                   registration={register("eventName")}
//                   // error={errors.eventName?.message}
//                   error={getError(errors?.eventName)}
//                 />
//               </div>
//               <div>
//                 <p>Only Technology category type side events are accepted</p>
//                 <Controller
//                   name="categoryId"
//                   control={control}
//                   render={({ field }) => (
//                     <GenericSelectDropdown
//                       label={t("category")}
//                       options={technologyCategories}
//                       onChange={(value) => {
//                         field.onChange(value);
//                         setValue("categoryId", value, { shouldValidate: true });
//                       }}
//                     />
//                   )}
//                 />
//                 {errors.categoryId && (
//                   <p className="mt-1 text-error-500 text-sm">
//                     {getError(errors.categoryId)}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <Label>{t("sideEventsCSV")}</Label>
//               <Controller
//                 name="file"
//                 control={control}
//                 render={({ field }) => (
//                   <CSVFileUpload onFileChange={handleFileChange} />
//                 )}
//               />
//               {errors.file && (
//                 <p className="mt-1 text-error-500 text-sm">
//                   {/* {errors.file.message} */}
//                   {getError(errors.file)}
//                 </p>
//               )}
//             </div>
//           </div>
//           <a
//             href="/test-sheets.csv"
//             download
//             className="hover:text-blue-600 dark:text-white underline cursor-pointer"
//             style={{ textDecoration: "underline" }}
//           >
//             {t("noteCSV")}
//           </a>

//           <div className="flex justify-end items-center gap-4 mt-6 w-full">
//             <GenericButton
//               btnText={t("cancel")}
//               bgColor="transparent"
//               borderRadius="5rem"
//               color="white"
//               height="2.5rem"
//               width="5.813rem"
//               handleClick={onClose}
//               type="button"
//             />
//             <GenericButton
//               btnText={isLoading ? "" : t("save")}
//               icon={isLoading && <Loading size="sm" />}
//               bgColor="#FFFF00"
//               borderRadius="5rem"
//               color="#fff"
//               height="2.5rem"
//               width="6.75rem"
//               type="submit"
//               disabled={isLoading}
//             />
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };
