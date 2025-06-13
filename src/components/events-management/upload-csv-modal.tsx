"use client";
import { AddCategoryIcon } from "@/icons";
import React from "react";
import * as Yup from "yup";
import {
  Controller,
  useForm,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import GenericButton from "../atoms/generic-button/generic-button";
import GenericSelectDropdown from "../atoms/generic-select-dropdown/generic-select-dropdown";
import { CSVFileUpload } from "../atoms/csv-file-upload";
import { ApiErrorResponse } from "@/services/auth-api/auth-api.types";
import Loading from "../atoms/loading/loading";
import { useUploadEventCSVMutation } from "@/services/events-management-api";

// Type-safe error message extractor
const getError = (
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
): string | undefined => {
  return error?.message?.toString();
};

interface UploadCSVFormValues {
  eventName: string;
  category: string;
  file: File | null;
}

const validationSchema = Yup.object().shape({
  eventName: Yup.string()
    .required("Event name is required")
    .max(100, "Event name must be at most 100 characters"),
  category: Yup.string().required("Category is required"),
  file: Yup.mixed<File>()
    .required("CSV file is required")
    .test("fileType", "Only CSV files are allowed", (value) => {
      return value && value.type === "text/csv";
    })
    .test("fileSize", "File size must be less than 10MB", (value) => {
      return value && value.size <= 10 * 1024 * 1024; // 10MB
    }),
});

const typeOptions = [
  { label: "Tech", value: "technology" },
  { label: "General", value: "general" },
];

export const UploadCSVModal = ({ onClose }: { onClose: () => void }) => {
  const [uploadEventCSV, { isLoading }] = useUploadEventCSVMutation();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      eventName: "",
      category: "",
      file: null,
    },
    mode: "onChange",
  });

  const handleFileChange = (selectedFile: File) => {
    setValue("file", selectedFile, { shouldValidate: true });
  };

  const onSubmit = async (data: UploadCSVFormValues) => {
    try {
      const formData = new FormData();
      formData.append("file", data.file as File);
      // Add other fields if needed
      formData.append("eventName", data?.eventName);
      formData.append("category", data?.category);

      const response = await uploadEventCSV(formData).unwrap();
      toast.success("CSV file uploaded successfully!");
      console.log("Upload response:", response);
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
      const apiError = error as ApiErrorResponse;
      toast.error(
        apiError.data?.message ||
          "Failed to upload CSV file. Please try again.",
      );
    }
  };

  const getErrorMessage = (error?: FieldError) => {
    return error?.message?.toString();
  };

  return (
    <div className="flex flex-col gap-[2.5rem] items-start w-full">
      <div className="flex items-center justify-start gap-4">
        <AddCategoryIcon />
        <p className="font-semibold text-[1.25rem] text-[#102445]">
          Upload CSV
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-6 py-2 w-full max-h-[40rem] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventName">Event Name</Label>
              <Input
                id="eventName"
                placeholder="Enter event name"
                registration={register("eventName")}
                // error={errors.eventName?.message}
                error={getError(errors?.eventName)}
              />
            </div>

            <div>
              {/* <Label htmlFor="category">Category</Label> */}
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <GenericSelectDropdown
                    label="Category"
                    options={typeOptions}
                    onChange={(value) => {
                      field.onChange(value);
                      setValue("category", value, { shouldValidate: true });
                    }}
                  />
                )}
              />
              {errors.category && (
                <p className="mt-1 text-sm text-error-500">
                  {/* {errors.category.message} */}
                  {getError(errors.category)}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label>CSV File</Label>
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <CSVFileUpload onFileChange={handleFileChange} />
              )}
            />
            {errors.file && (
              <p className="mt-1 text-sm text-error-500">
                {/* {errors.file.message} */}
                {getError(errors.file)}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 justify-end mt-6 w-full">
          <GenericButton
            btnText="Cancel"
            bgColor="transparent"
            borderRadius="5rem"
            color="#000"
            height="2.5rem"
            width="5.813rem"
            handleClick={onClose}
            type="button"
          />
          <GenericButton
            btnText={isLoading ? "" : "Save"}
            icon={isLoading && <Loading size="sm" />}
            bgColor="#1862D4"
            borderRadius="5rem"
            color="#fff"
            height="2.5rem"
            width="6.75rem"
            type="submit"
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};
