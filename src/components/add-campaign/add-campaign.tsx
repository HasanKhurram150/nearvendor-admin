"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import Label from "../form/Label";
import Input from "../form/input/InputField";
import SearchableDropdown from "../common/searchable-dropdown";

type Option = {
  label: string;
  value: string;
};

const validationSchema = Yup.object().shape({
  advertiser: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("Advertiser is required"),
  campaignName: Yup.string().required("Campaign name is required"),
  agencyInfo: Yup.string().required("Agency info is required"),
  campaignDetail: Yup.string().required("Campaign detail is required"),
  agencyFee: Yup.string().required("Agency fee is required"),
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Sub category is required"),
  periodStart: Yup.date()
    .required("Start date is required")
    .typeError("Invalid start date"),
  periodEnd: Yup.date()
    .required("End date is required")
    .min(Yup.ref("periodStart"), "End date must be after start date")
    .typeError("Invalid end date"),
  totalBudget: Yup.string()
    .required("Total budget is required")
    .matches(/^\d+$/, "Budget must be a number"),
  settlement: Yup.string().required("Settlement is required"),
});

const AddCampaign: React.FC = () => {
  const [selected, setSelected] = useState<Option | null>(null);

  console.log("selected", selected);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      advertiser: null,
      campaignName: "",
      agencyInfo: "",
      campaignDetail: "",
      agencyFee: "",
      category: "",
      subCategory: "",
      periodStart: "",
      periodEnd: "",
      totalBudget: "",
      settlement: "",
    },
  });

  const advertiserOptions = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
  ];

  // const selectedAdvertiser = watch("advertiser");

  const handleSelect = (option: Option | null) => {
    setValue("advertiser", option, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    // setIsSubmitting(true);
    try {
      // Here you would typically call your API
      console.log("Form data:", data);
      toast.success("Campaign created successfully!");
      // Reset form or navigate away if needed
    } catch (error) {
      toast.error("Failed to create campaign. Please try again.");
    } finally {
      // setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] p-[1.875rem]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="pb-4">
            <Label>Advertiser</Label>
            <Controller
              name="advertiser"
              control={control}
              render={({ field }) => (
                <SearchableDropdown
                  options={advertiserOptions}
                  onSelect={handleSelect}
                  placeholder="Search and select advertiser"
                />
              )}
            />
            {errors.advertiser && (
              <p className="mt-1 text-sm text-error-500">
                {errors.advertiser.message as string}
              </p>
            )}
          </div>
          <div className="pb-4">
            <Label>Campaign Name</Label>
            <Input
              placeholder="Automatically Generated after creation"
              type="text"
              registration={register("campaignName")}
              error={errors.campaignName?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Agency Info</Label>
            <Input
              placeholder="Automatically Generated after creation"
              type="text"
              registration={register("agencyInfo")}
              error={errors.agencyInfo?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Campaign Detail</Label>
            <Input
              placeholder="Automatically Generated after creation"
              type="text"
              registration={register("campaignDetail")}
              error={errors.campaignDetail?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Agency Fee</Label>
            <Input
              placeholder="Select from Advertiser linked Agency list"
              type="text"
              registration={register("agencyFee")}
              error={errors.agencyFee?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Category</Label>
            <Input
              placeholder="Automatically Generated after creation"
              type="text"
              registration={register("category")}
              error={errors.category?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Sub Category</Label>
            <Input
              placeholder="Select from Advertiser linked Agency list"
              type="text"
              registration={register("subCategory")}
              error={errors.subCategory?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Period (Start)</Label>
            <Input
              placeholder="MM/DD/YYYY"
              type="date"
              registration={register("periodStart")}
              error={errors.periodStart?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Period (End)</Label>
            <Input
              placeholder="MM/DD/YYYY"
              type="date"
              registration={register("periodEnd")}
              error={errors.periodEnd?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Total Budget</Label>
            <Input
              placeholder="Enter budget"
              type="text"
              registration={register("totalBudget")}
              error={errors.totalBudget?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Settlement</Label>
            <Input
              placeholder="can select : Upfront(prepayment) / Postpaid"
              type="text"
              registration={register("settlement")}
              error={errors.settlement?.message as string}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="flex items-center justify-center text-white btn-bg h-[2.5rem] w-[10rem] rounded-[5rem]">
            Save
          </button>
          <button className="flex items-center justify-center  text-[#000] bg-white border border-[#D9D9D9] h-[2.5rem] w-[10rem] rounded-[5rem]">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCampaign;
