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
import FileUpload from "./file-upload";
import SearchableDropdown from "../common/searchable-dropdown";
import {
  useAddInventoryMutation,
  useGetAllInventoryQuery,
} from "@/services/inventory-api";
import { useGetCampaignsQuery } from "@/services/campaign-api";
import { ApiErrorResponse } from "@/services/auth-api/auth-api.types";
import { useGetAllPlacementsQuery } from "@/services";
import DatePicker from "../date-picker/date-picker";
import TimePicker from "../time-picker/time-picker";
import dayjs, { Dayjs } from "dayjs";
import PageBreadcrumb from "../common/PageBreadCrumb";
import { useLanguage } from "../common/LanguageContext";

type Option = {
  label: string;
  value: string;
};

type DayNumber = "1" | "2" | "3" | "4" | "5" | "6" | "7";

const daysMap: { [key in DayNumber]: string } = {
  "1": "MONDAY",
  "2": "TUESDAY",
  "3": "WEDNESDAY",
  "4": "THURSDAY",
  "5": "FRIDAY",
  "6": "SATURDAY",
  "7": "SUNDAY",
};

type Days =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

const reverseDaysMap: { [key in Days]: string } = {
  MONDAY: "1",
  TUESDAY: "2",
  WEDNESDAY: "3",
  THURSDAY: "4",
  FRIDAY: "5",
  SATURDAY: "6",
  SUNDAY: "7",
};

const CreateInventory: React.FC = () => {
  const { t } = useLanguage();
  const [budgetCap, setSetBudget] = useState(0);
  const router = useRouter();
  const { data: placements, isLoading: isFetchingPlacements } =
    useGetAllPlacementsQuery();
  const { data: inventory, isLoading: inventoryLoading } =
    useGetAllInventoryQuery({
      page: 1,
      limit: 200,
    });
  const { data: campaigns, isLoading: isFetchingCampaigns } =
    useGetCampaignsQuery({
      page: 1,
      limit: 10,
    });
  const [mutate, { isLoading }] = useAddInventoryMutation();
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
    inventorySelection: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
      .nullable()
      .required("Inventory Selection is required"),
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
    budgetTotal: Yup.number()
      // Handles cases where the input is not a number (e.g., "abc")
      .typeError("Budget must be a number")

      // Ensures the budget is a positive value
      .positive("Budget must be a positive number")

      // The field is still required
      .required("Allocated budget is required")

      // The dynamic validation rule
      .max(
        Yup.ref("budgetCap"),
        "Allocated budget cannot be more than the budget cap of ${max}",
      ),
    materialName: Yup.string(),

    materialType: Yup.string().required("Material type is required"),
    materialSize: Yup.string().required("Material size is required"),
    landingType: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
      .nullable()
      .required("Landing Type is Required"),
    landingUrl: Yup.string()
      .url("Invalid URL")
      .required("Landing URL is required"),
    unitCost: Yup.string().required("Unit cost is required"),

    unitCostType: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
      .nullable()
      .required("Unit Cost Type is required"),
    creativeFile: Yup.string().required("Creative file is required"),
  });
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
      budgetCap: budgetCap,
      placementId: null,
      campaign: null,
      inventorySelection: "",
      inventoryName: "",
      inventoryDesc: "",
      exposureStartDate: dayjs(),
      exposureEndDate: dayjs(),
      impressionDay: [],
      dailyStartTime: dayjs(),
      dailyEndTime: dayjs().add(1, "hours"),
      budgetTotal: "",
      materialName: "",
      materialDetails: "",
      materialType: "",
      materialSize: "",
      landingType: "",
      landingUrl: "",
      unitCost: "",
      unitCostType: "",
      creativeFile: null,
    },
  });

  const placementsOptions =
    placements?.map((placements) => ({
      label: placements?.placementName,
      value: placements?.id,
    })) || [];

  const inventoryOptions =
    inventory?.data?.map((inventory) => ({
      label: inventory?.inventoryName,
      value: inventory?.id,
    })) || [];

  const campaignOptions =
    campaigns?.data.map((campaign) => ({
      label: campaign?.name,
      value: campaign?.id,
    })) || [];

  const landingTypeOptions = [
    { label: "In App", value: "in_app" },
    { label: "OUT LINK", value: "out_link" },
  ];

  const unitCostTypeOptions = [
    { label: "CPC", value: "CPC" },
    { label: "CPM", value: "CPM" },
  ];

  const handleSelectLandingType = (option: Option | null) => {
    setValue("landingType", option, { shouldValidate: true });
  };

  const handleSelectUnitCostType = (option: Option | null) => {
    setValue("unitCostType", option, { shouldValidate: true });
  };

  const handleSelectPlacement = (option: Option | null) => {
    setValue("placementId", option, { shouldValidate: true });
    const selectedPlacement = placements?.find(
      (placement) => placement.id === option?.value,
    );
    if (selectedPlacement) {
      setValue("materialName", selectedPlacement.placementName, {
        shouldValidate: true,
      });
      setValue("materialType", selectedPlacement.support, {
        shouldValidate: true,
      });
      setValue(
        "materialSize",
        `${selectedPlacement.width}x${selectedPlacement.height}`,
        {
          shouldValidate: true,
        },
      );
    }
  };

  const handleSelectCampaign = (option: Option | null) => {
    setValue("campaign", option, { shouldValidate: true });
    const selectedCampaign = campaigns?.data?.find(
      (campaign) => campaign.id === option?.value,
    );
    if (selectedCampaign) {
      setSetBudget(Number(selectedCampaign.budgetRemaining));
      setValue("budgetCap", Number(selectedCampaign.budgetRemaining), {
        shouldValidate: true,
      });
    }
  };

  const handleSelectInventrory = (option: Option | null) => {
    setValue("inventorySelection", option, { shouldValidate: true });
    const selectedInventory = inventory?.data?.find(
      (inventory) => inventory.id === option?.value,
    );
    if (selectedInventory) {
      setValue(
        "placementId",
        {
          label: selectedInventory.placement.placementName,
          value: selectedInventory.placement.id,
        },
        { shouldValidate: true },
      );
      setValue("materialType", selectedInventory.placement.support, {
        shouldValidate: true,
      });
      setValue(
        "materialSize",
        `${selectedInventory.placement.width}x${selectedInventory.placement.height}`,
        {
          shouldValidate: true,
        },
      );
      setValue("materialName", selectedInventory.adsName, {
        shouldValidate: true,
      });
      setValue(
        "campaign",
        {
          label: selectedInventory.campaign.name,
          value: selectedInventory.campaign.id,
        },
        { shouldValidate: true },
      );
      setValue(
        "budgetCap",

        selectedInventory.campaign.budgetRemaining,
        { shouldValidate: true },
      );
      setValue("inventoryName", selectedInventory.inventoryName, {
        shouldValidate: true,
      });
      setValue("inventoryDesc", selectedInventory.inventoryDesc, {
        shouldValidate: true,
      });
      setValue("exposureStartDate", selectedInventory.startDate, {
        shouldValidate: true,
      });
      setValue("exposureEndDate", selectedInventory.endDate, {
        shouldValidate: true,
      });
      setValue(
        "impressionDay",
        selectedInventory.impressionDay.split(",").map((dayNumber: string) => {
          return daysMap[dayNumber as DayNumber];
        }),
        {
          shouldValidate: true,
        },
      );
      setValue(
        "dailyStartTime",
        `${selectedInventory.startTime.split(".")[0]}`,
        {
          shouldValidate: true,
        },
      );
      setValue("dailyEndTime", `${selectedInventory.endTime.split(".")[0]}`, {
        shouldValidate: true,
      });
      setValue(
        "landingType",
        landingTypeOptions[
          selectedInventory.landingType === "out_link" ? 1 : 0
        ],
        {
          shouldValidate: true,
        },
      );
      setValue("landingUrl", selectedInventory.landingUrl, {
        shouldValidate: true,
      });
      setValue("unitCost", selectedInventory.unitCost, {
        shouldValidate: true,
      });
      setValue(
        "unitCostType",
        {
          label: selectedInventory.costType,
          value: selectedInventory.costType,
        },
        {
          shouldValidate: true,
        },
      );
      setValue("creativeFile", selectedInventory.file1, {
        shouldValidate: true,
      });
    }
  };

  const handleSetEndDate = (val: Dayjs | null) => {
    setValue("exposureEndDate", val?.toISOString());
  };

  const handleSetStartDate = (val: Dayjs | null) => {
    setValue("exposureStartDate", val?.toISOString());
  };
  const handleSetEndTime = (val: Dayjs | null) => {
    setValue("dailyEndTime", val?.toISOString());
  };
  const handleSetStartTime = (val: Dayjs | null) => {
    setValue("dailyStartTime", val?.toISOString());
  };

  const onSubmit = async (formData: any) => {
    const impressionDays = formData.impressionDay
      .map((day: Days) => reverseDaysMap[day])
      .join(",");

    try {
      const payload = {
        placementId: formData.placementId.value,
        campaignId: formData.campaign.value,
        inventorySelection: formData.inventorySelection.value,
        inventoryName: formData.inventoryName,
        inventoryDesc: formData.inventoryDesc,
        startDate: formData.exposureStartDate,
        endDate: formData.exposureEndDate,
        impressionDay: impressionDays,
        startTime: `${formData.dailyStartTime}.000Z`,
        endTime: `${formData.dailyEndTime}.000Z`,
        budgetTotal: Number(formData.budgetTotal),
        adsName: formData.materialName,
        materialType: formData.materialType,
        materialSize: formData.materialSize,
        landingType: formData.landingType.value,
        landingUrl: formData.landingUrl,
        unitCost: formData.unitCost,
        costType: formData.unitCostType.value,
        file1: formData.creativeFile,
        status: 1,
      };

      await mutate(payload).unwrap();

      toast.success("Inventory created successfully!");
      router.push("/inventory-list");

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
    <>
      <PageBreadcrumb pageTitle={t("createInventory")} />
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
                    value={watch("placementId")?.label ?? ""}
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
                    value={watch("campaign")?.label ?? ""}
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
              <Controller
                name="inventorySelection"
                control={control}
                render={() => (
                  <SearchableDropdown
                    value={watch("inventorySelection")?.label ?? ""}
                    isLoading={inventoryLoading}
                    options={inventoryOptions}
                    onSelect={handleSelectInventrory}
                    placeholder="Search and select inventory"
                    // disabled={!selectedAdvertiser}
                  />
                )}
              />
              {errors.inventorySelection && (
                <p className="mt-1 text-sm text-error-500">
                  {errors.inventorySelection.message as string}
                </p>
              )}
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
              <DatePicker
                value={watch("exposureStartDate")}
                handleChange={handleSetStartDate}
              />
              {errors.exposureStartDate && (
                <p className="mt-1 text-sm text-error-500">
                  {errors.exposureStartDate?.message as string}
                </p>
              )}
            </div>
            <div className="pb-4">
              <Label>Exposure Period (End)</Label>
              <DatePicker
                value={watch("exposureEndDate")}
                handleChange={handleSetEndDate}
              />
              {errors.exposureEndDate && (
                <p className="mt-1 text-sm text-error-500">
                  {errors.exposureEndDate?.message as string}
                </p>
              )}
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
                  <TimePicker
                    value={watch("dailyStartTime")}
                    handleChange={handleSetStartTime}
                  />
                  {errors.dailyStartTime && (
                    <p className="mt-1 text-sm text-error-500">
                      {errors.dailyStartTime?.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <Label>End</Label>
                  <TimePicker
                    value={watch("dailyEndTime")}
                    handleChange={handleSetEndTime}
                  />
                  {errors.dailyEndTime && (
                    <p className="mt-1 text-sm text-error-500">
                      {errors.dailyEndTime?.message as string}
                    </p>
                  )}
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
                disabled={true}
              />
            </div>

            <div className="pb-4">
              <Label>Material Type</Label>
              <Input
                placeholder="Enter material type"
                type="text"
                registration={register("materialType")}
                error={errors.materialType?.message as string}
                disabled={true}
              />
            </div>
            <div className="pb-4">
              <Label>Material Size</Label>
              <Input
                placeholder="Enter material size"
                type="text"
                registration={register("materialSize")}
                error={errors.materialSize?.message as string}
                disabled={true}
              />
            </div>
            <div className="pb-4">
              <div className="pb-4">
                <Label>Landing Type</Label>
                <Controller
                  name="landingType"
                  control={control}
                  render={() => (
                    <SearchableDropdown
                      value={watch("landingType")?.label ?? ""}
                      options={landingTypeOptions}
                      onSelect={handleSelectLandingType}
                      placeholder="Select Landing Type"
                      // disabled={!selectedAdvertiser}
                    />
                  )}
                />
                {errors.landingType && (
                  <p className="mt-1 text-sm text-error-500">
                    {errors.landingType?.message as string}
                  </p>
                )}
              </div>
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
              <Label>Unit Cost</Label>
              <Input
                placeholder="Enter Unit Cost"
                type="text"
                registration={register("unitCost")}
                error={errors.unitCost?.message as string}
              />
            </div>
            <div className="pb-4">
              <Label>Unit Cost Type</Label>
              <Controller
                name="unitCostType"
                control={control}
                render={() => (
                  <SearchableDropdown
                    value={watch("unitCostType").label ?? ""}
                    options={unitCostTypeOptions}
                    onSelect={handleSelectUnitCostType}
                    placeholder="Select Unit Cost type"
                    // disabled={!selectedAdvertiser}
                  />
                )}
              />
              {errors.landingType && (
                <p className="mt-1 text-sm text-error-500">
                  {errors.landingType?.message as string}
                </p>
              )}
            </div>
            <div className="pb-4">
              <Label>Creative File</Label>
              <Controller
                name="creativeFile"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    value={field.value}
                    onChange={(url) => {
                      setValue("creativeFile", url);
                    }}
                    accept="image/*,video/mp4"
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
    </>
  );
};

export default CreateInventory;
