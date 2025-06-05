"use client";
import { AddCategoryIcon } from "@/icons";
import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import GenericButton from "../atoms/generic-button/generic-button";

export const EditCategoryModal = ({ onClose }: { onClose: () => void }) => {
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

          <div>
            <Label>Source ID</Label>
            <Input
              id="sourceID"
              type="sourceID"
              placeholder="Enter source ID"
              // registration={register("email")}
              // error={errors.email?.message}
            />
          </div>
          <div>
            <Label>Event Count</Label>
            <Input
              id="eventCount"
              type="eventCount"
              placeholder="0"
              // registration={register("email")}
              // error={errors.email?.message}
            />
          </div>

          <div>
            <Label>Order</Label>
            <Input
              id="order"
              type="order"
              placeholder="0"
              // registration={register("email")}
              // error={errors.email?.message}
            />
          </div>

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
