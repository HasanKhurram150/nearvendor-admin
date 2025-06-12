"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "../atoms/loading/loading";

import Label from "../form/Label";
import Input from "../form/input/InputField";
import { WeekdayCheckboxes } from "./week-days";
import RadioButtonGroup from "./radio-button-group";
import CustomSelect from "./custom-select";
import FileUpload from "./file-upload";
import SearchableDropdown from "../common/searchable-dropdown";
import { useGetAllAdvertiserQuery } from "@/services/advertiser-api";
import { useAddInventoryMutation } from "@/services/inventory-api";
import { useGetCampaignsQuery } from "@/services/campaign-api";
import { ApiErrorResponse } from "@/services/auth-api/auth-api.types";
import { useGetAllPlacementsQuery } from "@/services";

type Option = {
  label: string;
  value: string;
};

const validationSchema = Yup.object().shape({
  placementId: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("Placement is required"),
  campaign: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("Campaign is required"),
  inventorySelection: Yup.string().required("Inventory selection is required"),
  inventoryName: Yup.string().required("Inventory name is required"),
  inventoryDesc: Yup.string().required("Inventory description is required"),
  exposureStartDate: Yup.date()
    .required("Start date is required")
    .typeError("Invalid start date"),
  exposureEndDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("exposureStartDate"), "End date must be after start date")
    .typeError("Invalid end date"),
  impressionDay: Yup.array()
    .of(Yup.string())
    .min(1, "At least one exposure day is required"),
  dailyStartTime: Yup.string().required("Start time is required"),
  dailyEndTime: Yup.string().required("End time is required"),
  budgetTotal: Yup.string()
    .required("Allocated budget is required")
    .matches(/^\d+$/, "Budget must be a number"),
  materialName: Yup.string().required("Material name is required"),
  materialDetails: Yup.string().required("Material details are required"),
  materialType: Yup.string().required("Material type is required"),
  materialSize: Yup.string().required("Material size is required"),
  landingType: Yup.string().required("Landing type is required"),
  landingUrl: Yup.string()
    .url("Invalid URL")
    .required("Landing URL is required"),
  trackingUsage: Yup.string().required("Tracking usage is required"),
  trackingUrl: Yup.string()
    .url("Invalid URL")
    .required("Tracking URL is required"),
  // creativeFile: Yup.mixed().required("Creative file is required"),
});

const CreateInventory: React.FC = () => {
  const [selected, setSelected] = useState<Option | null>(null);
  const router = useRouter();
  const { data: placements, isLoading: isFetchingPlacements } =
    useGetAllPlacementsQuery();
  const { data: campaigns, isLoading: isFetchingCampaigns } =
    useGetCampaignsQuery({
      page: 1,
      limit: 10,
    });
  const [mutate, { isLoading }] = useAddInventoryMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      placementId: null,
      campaign: null,
      inventorySelection: "",
      inventoryName: "",
      inventoryDesc: "",
      exposureStartDate: "",
      exposureEndDate: "",
      impressionDay: [],
      dailyStartTime: "",
      dailyEndTime: "",
      budgetTotal: "",
      materialName: "",
      materialDetails: "",
      materialType: "",
      materialSize: "",
      landingType: "",
      landingUrl: "",
      trackingUsage: "",
      trackingUrl: "",
      creativeFile: null,
    },
  });

  // const selectedAdvertiser = watch("advertiser");

  const placementsOptions =
    placements?.map((placements) => ({
      label: placements?.placementName,
      value: placements?.id,
    })) || [];

  const campaignOptions =
    campaigns?.data.map((campaign) => ({
      label: campaign?.name,
      value: campaign?.id,
    })) || [];

  const handleSelectPlacement = (option: Option | null) => {
    setValue("placementId", option, { shouldValidate: true });
    // setValue("campaign", null); // Reset campaign when advertiser changes
  };

  const handleSelectCampaign = (option: Option | null) => {
    setValue("campaign", option, { shouldValidate: true });
  };

  // const handleExposureDaysChange = (selectedDays: string[]) => {
  //   setValue("exposureDays", selectedDays, { shouldValidate: true });
  // };

  // const handleFileUpload = (file: File) => {
  //   setValue("creativeFile", file, { shouldValidate: true });
  // };

  const onSubmit = async (formData: any) => {
    try {
      const payload = {
        placementId: formData.placementId.value,
        campaignId: formData.campaign.value,
        inventorySelection: formData.inventorySelection,
        inventoryName: formData.inventoryName,
        inventoryDesc: formData.inventoryDesc,
        startDate: formData.exposureStartDate,
        endDate: formData.exposureEndDate,
        impressionDay: formData.impressionDay.join(","),
        dailyStartTime: formData.dailyStartTime,
        dailyEndTime: formData.dailyEndTime,
        budgetTotal: Number(formData.budgetTotal),
        materialName: formData.materialName,
        materialDetails: formData.materialDetails,
        materialType: formData.materialType,
        materialSize: formData.materialSize,
        landingType: formData.landingType,
        landingUrl: formData.landingUrl,
        trackingUsage: formData.trackingUsage,
        trackingUrl: formData.trackingUrl,
        creativeFile: formData.creativeFile,
      };

      await mutate(payload).unwrap();

      console.log({ payload });

      toast.success("Inventory created successfully!");
      // router.push("/inventory-management");

      // reset();
    } catch (error) {
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
            <Label>Placements</Label>
            <Controller
              name="placementId"
              control={control}
              render={() => (
                <SearchableDropdown
                  isLoading={isFetchingPlacements}
                  options={placementsOptions}
                  onSelect={handleSelectPlacement}
                  placeholder="Search and select placement"
                />
              )}
            />
            {errors.advertiser && (
              <p className="mt-1 text-sm text-error-500">
                {errors.advertiser.message as string}
              </p>
            )}
            {/* <Input placeholder="Search and select the advertiser" type="text" /> */}
          </div>
          <div className="pb-4">
            <Label>Campaign</Label>
            <Controller
              name="campaign"
              control={control}
              render={() => (
                <SearchableDropdown
                  isLoading={isFetchingCampaigns}
                  options={campaignOptions}
                  onSelect={handleSelectCampaign}
                  placeholder="Search and select campaign"
                  // disabled={!selectedAdvertiser}
                />
              )}
            />
            {errors.campaign && (
              <p className="mt-1 text-sm text-error-500">
                {errors.campaign.message as string}
              </p>
            )}
          </div>
          {/* <div className="pb-4"> 
          <Label>Advertiser Code</Label>
          <Input placeholder="Enter your code" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Campaign Code</Label>
          <Input placeholder="Enter your code" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Campaign Duration</Label>
          <Input placeholder="yyddmm hh:mm ~ yyddmm hh:mm" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Campaign Total Budget</Label>
          <Input placeholder="Enter your budget" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Target Group</Label>
          <Input placeholder="Enter target group" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Target Group Code</Label>
          <Input placeholder="Enter your code" type="text" />
        </div> */}
          <p className="flex flex-col items-start text-xl font-semibold text-gray-800 dark:text-white/90">
            Basic Inventory Information
          </p>
          <div />
          {/* <div className="pb-4"> 
          <Label>Inventory Code</Label>
          <Input placeholder="Enter your code" type="text" />
        </div> */}
          <div className="pb-4">
            <Label>Inventory Selection</Label>
            <Input
              placeholder="Search and select inventory"
              type="text"
              registration={register("inventorySelection")}
              error={errors.inventorySelection?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Inventory Name</Label>
            <Input
              placeholder="Enter your inventory name"
              type="text"
              registration={register("inventoryName")}
              error={errors.inventoryName?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Inventory Description</Label>
            <Input
              placeholder="Enter your description"
              type="text"
              registration={register("inventoryDesc")}
              error={errors.inventoryDesc?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Exposure Period (Start)</Label>
            <Input
              placeholder="MM/DD/YYYY"
              type="date"
              registration={register("exposureStartDate")}
              error={errors.exposureStartDate?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Exposure Period (End)</Label>
            <Input
              placeholder="MM/DD/YYYY"
              type="date"
              registration={register("exposureEndDate")}
              error={errors.exposureEndDate?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Exposure Days</Label>
            <Controller
              name="impressionDay"
              control={control}
              render={({ field }) => (
                <WeekdayCheckboxes
                  value={field.value || []}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.exposureDays && (
              <p className="mt-1 text-sm text-error-500">
                {errors.impressionDay?.message as string}
              </p>
            )}
          </div>
          <div className="pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Start</Label>
                <Input
                  placeholder="HH:MM"
                  type="time"
                  registration={register("dailyStartTime")}
                  error={errors.dailyStartTime?.message as string}
                />
              </div>
              <div>
                <Label>End</Label>
                <Input
                  placeholder="HH:MM"
                  type="time"
                  registration={register("dailyEndTime")}
                  error={errors.dailyEndTime?.message as string}
                />
              </div>
            </div>
          </div>
          <div className="pb-4">
            <Label>Inventory Allocated/Remaining Budget</Label>
            <Input
              placeholder="Enter allocated budget"
              type="text"
              registration={register("budgetTotal")}
              error={errors.budgetTotal?.message as string}
            />
          </div>
          {/* <div className="pb-4"> 
            <Label>Inventory Total Budget</Label>
            <Input placeholder="Enter your description" type="text" />
          </div> */}
          {/* <div className="pb-4"> 
          <Label>Bonus Budget Setting (%)</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Cost Per Individual</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Cost Per Individual Unit Price</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Cost Per Individual Unit Price</Label>
          <RadioButtonGroup options={options} name="example" />
        </div>
        <div className="pb-4"> 
          <Label>Early Consumption Operation Ratio (%)</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Early Consumption Daily Budget Setting</Label>
          <Input placeholder="Enter your description" type="text" />
        </div> */}

          <p className="flex flex-col items-start text-xl font-semibold text-gray-800 dark:text-white/90">
            Inventory Details
          </p>
          <div />
          <div className="pb-4">
            <Label>Material Name</Label>
            <Input
              placeholder="Enter material name"
              type="text"
              registration={register("materialName")}
              error={errors.materialName?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Material Operation Details</Label>
            <Input
              placeholder="Enter material details"
              type="text"
              registration={register("materialDetails")}
              error={errors.materialDetails?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Material Type</Label>
            <Input
              placeholder="Enter material type"
              type="text"
              registration={register("materialType")}
              error={errors.materialType?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Material Size</Label>
            <Input
              placeholder="Enter material size"
              type="text"
              registration={register("materialSize")}
              error={errors.materialSize?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Landing Type</Label>
            <Input
              placeholder="Enter landing type"
              type="text"
              registration={register("landingType")}
              error={errors.landingType?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Landing URL</Label>
            <Input
              placeholder="Enter landing URL"
              type="text"
              registration={register("landingUrl")}
              error={errors.landingUrl?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Tracking Usage</Label>
            <Input
              placeholder="Enter tracking usage"
              type="text"
              registration={register("trackingUsage")}
              error={errors.trackingUsage?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Tracking URL</Label>
            <Input
              placeholder="Enter tracking URL"
              type="text"
              registration={register("trackingUrl")}
              error={errors.trackingUrl?.message as string}
            />
          </div>
          <div className="pb-4">
            <Label>Creative File</Label>
            <Controller
              name="creativeFile"
              control={control}
              render={({ field }) => (
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  accept="image/*,.pdf,.doc,.docx"
                  maxSize={10 * 1024 * 1024} // 10MB
                />
              )}
            />
            {errors.creativeFile && (
              <p className="mt-1 text-sm text-error-500">
                {errors.creativeFile.message as string}
              </p>
            )}
            {/* <FileUpload /> */}
          </div>
          {/* <div className="pb-4"> 
          <Label>Optimization Setting Selection</Label>
          <CustomSelect placeholder="Yes/No"/>
        </div>
        <div className="pb-4"> 
          <Label>Optimization Operation CTR Daily Basis</Label>
          <Input placeholder="Search and select the advertiser" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>A Grade Ratio</Label>
          <Input placeholder="Search and select the campaign" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>B Grade Ratio</Label>
          <Input placeholder="Search and select the advertiser" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>C Grade Ratio</Label>
          <Input placeholder="Search and select the campaign" type="text" />
        </div> */}
        </div>
        <div className="flex justify-end gap-4">
          {/* <button className="flex items-center justify-center text-white btn-bg h-[2.5rem] w-[10rem] rounded-[5rem]">
            Save
          </button> */}
          <button className="flex items-center justify-center  text-[#000] bg-white border border-[#D9D9D9] h-[2.5rem] w-[10rem] rounded-[5rem]">
            {isLoading ? <Loading /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInventory;
