"use client";
import { AddCalendarIcon, AddCategoryIcon } from "@/icons";
import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import GenericButton from "../atoms/generic-button/generic-button";
import TextArea from "../form/input/TextArea";
import { ProfilePhotoUpload } from "../atoms";
import DateTimeRangePicker from "./date-time-range-picker";
import GenericSelectDropdown from "../atoms/generic-select-dropdown/generic-select-dropdown";
import CSVUploadButton from "../atoms/csv-upload-button/csv-upload-button";
import { CSVFileUpload } from "../atoms/csv-file-upload";

export const UploadCSVModal = ({ onClose }: { onClose: () => void }) => {
  const typeOptions = [
    { label: "Tech", value: "tech" },
    { label: "General", value: "general" },
  ];

  const handleTypeChange = (value: string) => {
    console.log("Selected type:", value);
  };
  return (
    <div className="flex flex-col gap-[2.5rem] items-start w-full">
      <div className="flex items-center justify-start gap-4">
        <AddCategoryIcon />{" "}
        <p className="font-semibold text-[1.25rem] text-[#102445]">
          Upload CSV
        </p>
      </div>
      {/* <form className="w-full"> */}
      <div className="space-y-6 py-2 w-full max-h-[40rem] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Event Name</Label>
            <Input
              id="eventName"
              type="eventName"
              placeholder="Enter event name"
              // registration={register("email")}
              // error={errors.email?.message}
            />
          </div>

          <GenericSelectDropdown
            label="Category"
            options={typeOptions}
            defaultValue="tech"
            onChange={handleTypeChange}
          />
        </div>

        <CSVFileUpload />



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
        />
        <GenericButton
          btnText="Save"
          bgColor="#1862D4"
          borderRadius="5rem"
          color="#fff"
          height="2.5rem"
          width="6.75rem"
        />
      </div>
      {/* </form> */}
    </div>
  );
};
