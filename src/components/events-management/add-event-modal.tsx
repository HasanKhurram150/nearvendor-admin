"use client";
import { AddCalendarIcon, AddCategoryIcon } from "@/icons";
import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import GenericButton from "../atoms/generic-button/generic-button";
import TextArea from "../form/input/TextArea";
import { ProfilePhotoUpload } from "../atoms";
import DateTimeRangePicker from "./date-time-range-picker";

export const AddEventModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex flex-col gap-[2.5rem] items-start w-full">
      <div className="flex items-center justify-start gap-4">
        <AddCategoryIcon />{" "}
        <p className="font-semibold text-[1.25rem] text-[#102445]">
          Add New Event
        </p>
      </div>
      <form className="w-full">
        <div className="space-y-6 py-2 w-full max-h-[40rem] overflow-y-auto">
          {" "}
          <div>
            <Label>Name</Label>
            <Input
              id="calendarName"
              type="calendarName"
              placeholder="Enter calendar name"
              // registration={register("email")}
              // error={errors.email?.message}
            />
          </div>
          <div>
            <Label>Description</Label>
            <TextArea
              rows={2}
              // value={messageTwo}
              error
              placeholder="Brief description of the calendar"
              // onChange={(value) => setMessageTwo(value)}
              // hint="Brief description of the calendar"
            />
          </div>
          <div>
            <Label>Instructions</Label>
            <Input
              id="instructions"
              type="instructions"
              placeholder="Enter instructions"
              // registration={register("email")}
              // error={errors.email?.message}
            />
          </div>
          <DateTimeRangePicker />
          <div>
            <Label>Capacity</Label>
            <Input
              id="capacity"
              type="capacity"
              placeholder="0"
              // registration={register("email")}
              // error={errors.email?.message}
            />
          </div>
          {/* <ProfilePhotoUpload label="Profile Image" /> */}
        </div>

        <div className="flex items-center gap-4 justify-end mt-6">
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
            btnText="Create Calendar"
            bgColor="#1862D4"
            borderRadius="5rem"
            color="#fff"
            height="2.5rem"
            width="10.5rem"
          />
        </div>
      </form>
    </div>
  );
};
