"use client";
import { AddCategoryIcon } from "@/icons";
import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import GenericButton from "../atoms/generic-button/generic-button";
import GenericSelectDropdown from "../atoms/generic-select-dropdown/generic-select-dropdown";

export const EditCategoryModal = ({ onClose }: { onClose: () => void }) => {
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
          Edit Category
        </p>
      </div>
      <form className="w-full">
        <div className="space-y-6 w-full">
          <div>
            <Label>Name</Label>
            <Input
              id="categoryName"
              type="categoryName"
              placeholder="Enter category name"
              // registration={register("email")}
              // error={errors.email?.message}
            />
          </div>
          <GenericSelectDropdown
            label="Type"
            options={typeOptions}
            defaultValue="tech"
            onChange={handleTypeChange}
          />

          <div className="flex items-center gap-4 justify-end">
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
              btnText="Update"
              bgColor="#1862D4"
              borderRadius="5rem"
              color="#fff"
              height="2.5rem"
              width="6.75rem"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
