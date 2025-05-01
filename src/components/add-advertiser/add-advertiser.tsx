"use client";
import React from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "../atoms/loading/loading";
import { ApiErrorResponse } from "@/services/auth-api/auth-api.types";
import { useAddAdvertiserMutation } from "@/services/advertiser-api";

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  nickName: Yup.string().required("Advertiser name is required"),
  registrationNumber: Yup.string().required("Registration number is required"),
  representative: Yup.string().required("Representative is required"),
  businessRegistrationDocument: Yup.string()
    .url("Must be a valid URL")
    .required("Business registration document is required"),
  departmentName: Yup.string().required("Department name is required"),
  bankName: Yup.string().required("Bank name is required"),
});

const AddAdvertiser: React.FC = () => {
  const router = useRouter();
  const [mutate, { isLoading }] = useAddAdvertiserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      companyName: "",
      nickName: "",
      registrationNumber: "",
      representative: "",
      businessRegistrationDocument: "",
      departmentName: "",
      bankName: "",
    },
  });

  const onSubmit = async (formData: any) => {
    try {
      console.log(formData);
      await mutate(formData).unwrap();
      toast.success("Advertiser created successfully!");
      router.push("/advertiser-management");
      reset();
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      if (apiError.data && apiError.data.message) {
        toast.error(apiError.data.message);
      } else {
        toast.error("Failed to create advertiser. Please try again");
      }
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] p-[1.875rem]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="pb-4">
            <Label>Company Name</Label>
            <Input
              placeholder="Automatically Generated after creation"
              type="text"
              registration={register("companyName")}
              error={errors.companyName?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Advertiser Name</Label>
            <Input
              placeholder="Automatically Generated after creation"
              type="text"
              registration={register("nickName")}
              error={errors.nickName?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Registration Number</Label>
            <Input
              placeholder="Automatically Generated after creation"
              type="text"
              registration={register("registrationNumber")}
              error={errors.registrationNumber?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Representative</Label>
            <Input
              placeholder="Automatically Generated after creation"
              type="text"
              registration={register("representative")}
              error={errors.representative?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Business Registration Document</Label>
            <Input
              placeholder="Automatically Generated after creation"
              type="text"
              registration={register("businessRegistrationDocument")}
              error={errors.businessRegistrationDocument?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Department Name</Label>
            <Input
              placeholder="Automatically Generated after creation"
              type="text"
              registration={register("departmentName")}
              error={errors.departmentName?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Bank Name</Label>
            <Input
              placeholder="Automatically Generated after creation"
              type="text"
              registration={register("bankName")}
              error={errors.bankName?.message as string}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          {/* <button className="flex items-center justify-center text-white btn-bg h-[2.5rem] w-[10rem] rounded-[5rem]">
          Save
        </button> */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center  text-[#000] bg-white border border-[#D9D9D9] h-[2.5rem] w-[10rem] rounded-[5rem]"
          >
            {isLoading ? <Loading /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdvertiser;
