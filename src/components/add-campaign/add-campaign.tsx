"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import Label from "../form/Label";
import Input from "../form/input/InputField";
import SearchableDropdown from "../common/searchable-dropdown";
import { useAddCampaignMutation, useGetAllAdvertiserQuery } from "@/services";
import Select from "../form/Select";
import { useRouter } from "next/navigation";
import Loading from "../atoms/loading/loading";
import { ApiErrorResponse } from "@/services/auth-api/auth-api.types";

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
  name: Yup.string().required("Campaign name is required"),
  campaignType: Yup.string()
    .required("Campaign type is required")
    .oneOf(["event", "inventory", "channel", "mixed"], "Invalid campaign type"),
  status: Yup.number()
    .required("Status is required")
    .oneOf([0, 1], "Invalid status"),
  // agencyInfo: Yup.string().required("Agency info is required"),
  // campaignDetail: Yup.string().required("Campaign detail is required"),
  // agencyFee: Yup.string().required("Agency fee is required"),
  // category: Yup.string().required("Category is required"),
  // subCategory: Yup.string().required("Sub category is required"),
  startDate: Yup.date()
    .required("Start date is required")
    .typeError("Invalid start date"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date")
    .typeError("Invalid end date"),
  budgetTotal: Yup.string()
    .required("Total budget is required")
    .matches(/^\d+$/, "Budget must be a number"),
  // settlement: Yup.string().required("Settlement is required"),
});

const AddCampaign: React.FC = () => {
  // const [selected, setSelected] = useState<Option | null>(null);
  const router = useRouter();
  const { data, isLoading: isFetching } = useGetAllAdvertiserQuery();
  const [mutate, { isLoading }] = useAddCampaignMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      advertiser: null,
      campaignType: null,
      status: 1,
      name: "",
      // agencyInfo: "",
      // campaignDetail: "",
      // agencyFee: "",
      // category: "",
      // subCategory: "",
      startDate: "",
      endDate: "",
      budgetTotal: "",
      // settlement: "",
    },
  });

  const advertiserOptions =
    data?.map((advertiser) => ({
      label: advertiser?.nickName,
      value: advertiser?.id,
    })) || [];

  const typeOptions = [
    { value: "event", label: "Event" },
    { value: "inventory", label: "Inventory" },
    { value: "channel", label: "Channel" },
    { value: "mixed", label: "Mixed" },
  ];

  const statusOptions = [
    { value: "1", label: "Active" },
    { value: "0", label: "Inactive" },
  ];

  const handleSelectAdvertiser = (option: Option | null) => {
    setValue("advertiser", option, { shouldValidate: true });
  };

  const handleSelectType = (type: string) => {
    setValue("campaignType", type, { shouldValidate: true });
  };

  const handleSelectStatus = (value: string) => {
    setValue("status", Number(value), { shouldValidate: true });
  };

  const onSubmit = async (formData: any) => {
    try {
      const payload = {
        advertiserId: formData.advertiser.value,
        name: formData?.name,
        campaignType: formData?.campaignType,
        status: formData.status,
        startDate: formData?.startDate,
        endDate: formData?.endDate,
        budgetTotal: Number(formData?.budgetTotal),
      };
      console.log({ payload });

      await mutate(payload).unwrap();

      toast.success("Campaign created successfully!");
      router.push("/campaign-management");

      reset();
    } catch (error) {
      console.error("Error creating campaign:", error);
      const apiError = error as ApiErrorResponse;
      if (apiError.data && apiError.data.message) {
        toast.error(apiError.data.message);
      } else {
        toast.error("Failed to create campaign. Please try again");
      }
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
              render={() => (
                <SearchableDropdown
                  isLoading={isFetching}
                  options={advertiserOptions}
                  onSelect={handleSelectAdvertiser}
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
              registration={register("name")}
              error={errors.name?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Campaign Type</Label>
            {/* <Input
              placeholder="Automatically Generated after creation"
              type="text"
              registration={register("campaignType")}
              error={errors.campaignType?.message as string}
            /> */}

            <Controller
              name="campaignType"
              control={control}
              render={() => (
                <Select
                  options={typeOptions}
                  placeholder="Select Type"
                  onChange={handleSelectType}
                  className="dark:bg-dark-900"
                />
              )}
            />
            {errors.campaignType && (
              <p className="mt-1 text-sm text-error-500">
                {errors.campaignType.message as string}
              </p>
            )}
          </div>
          <div className="pb-4">
            <Label>Status</Label>
            <Controller
              name="status"
              control={control}
              render={() => (
                <Select
                  options={statusOptions}
                  placeholder="Select status"
                  onChange={handleSelectStatus}
                  // onChange={(value) => {
                  //   field.onChange(Number(value)); // Ensure number conversion
                  //   handleSelectStatus(value);
                  // }}
                  className="dark:bg-dark-900 p-2"
                />
              )}
            />
            {errors.status && (
              <p className="mt-1 text-sm text-error-500">
                {errors.status.message as string}
              </p>
            )}
          </div>
          {/* <div className="pb-4">
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
          </div> */}
          <div className="pb-4">
            <Label>Period (Start)</Label>
            <Input
              placeholder="MM/DD/YYYY"
              type="date"
              registration={register("startDate")}
              error={errors.startDate?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Period (End)</Label>
            <Input
              placeholder="MM/DD/YYYY"
              type="date"
              registration={register("endDate")}
              error={errors.endDate?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Total Budget</Label>
            <Input
              placeholder="Enter budget"
              type="text"
              registration={register("budgetTotal")}
              error={errors.budgetTotal?.message as string}
            />
          </div>
          {/* <div className="pb-4">
            <Label>Settlement</Label>
            <Input
              placeholder="can select : Upfront(prepayment) / Postpaid"
              type="text"
              registration={register("settlement")}
              error={errors.settlement?.message as string}
            />
          </div> */}
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

export default AddCampaign;
