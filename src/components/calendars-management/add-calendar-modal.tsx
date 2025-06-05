"use client";
import { AddCalendarIcon, AddCategoryIcon } from "@/icons";
import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import GenericButton from "../atoms/generic-button/generic-button";
import TextArea from "../form/input/TextArea";
import { ProfilePhotoUpload } from "../atoms";
import ColorPicker from "./color-picker";

export const AddCalendarModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex flex-col gap-[2.5rem] items-start w-full">
      <div className="flex items-center justify-start gap-4">
        <AddCalendarIcon />{" "}
        <p className="font-semibold text-[1.25rem] text-[#102445]">
          Add New Calendar
        </p>
      </div>
      <form className="w-full">
        <div className="space-y-6 py-2 w-full max-h-[40rem] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>{" "}
            <div>
              <Label>Identifier</Label>
              <Input
                id="identifier"
                type="identifier"
                placeholder="e.g., tech-events-2025"
                // registration={register("email")}
                // error={errors.email?.message}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              {" "}
              <div>
                <Label>Description</Label>
                <TextArea
                  rows={6}
                  // value={messageTwo}
                  error
                  placeholder="Brief description of the calendar"
                  // onChange={(value) => setMessageTwo(value)}
                  // hint="Brief description of the calendar"
                />
              </div>
            </div>
            <div>
              <Label>Theme Color</Label>

              <ColorPicker />
            </div>{" "}
            <div>
              <Label>Source ID</Label>
              <Input
                id="sourceID"
                type="sourceID"
                placeholder="e.g., cal-001"
                // registration={register("email")}
                // error={errors.email?.message}
              />
            </div>
            <ProfilePhotoUpload label="Cover Image" />
            <ProfilePhotoUpload label="Profile Image" />
            <div>
              <Label>Address</Label>
              <Input
                id="address"
                type="address"
                placeholder="0"
                // registration={register("email")}
                // error={errors.email?.message}
              />
            </div>{" "}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Latitude</Label>
                <Input id="latitude" type="latitude" placeholder="6" />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input id="longitude" type="longitude" placeholder="6" />
              </div>
            </div>
            <div>
              <Label>Socials</Label>
              <Input
                id="socials"
                type="socials"
                placeholder="Enter your social handle"
                // registration={register("email")}
                // error={errors.email?.message}
              />
            </div>{" "}
            <div>
              <Label>Website Link</Label>
              <Input
                id="website"
                type="website"
                placeholder="Enter your web link"
                // registration={register("email")}
                // error={errors.email?.message}
              />
            </div>{" "}
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
              btnText="Create Calendar"
              bgColor="#1862D4"
              borderRadius="5rem"
              color="#fff"
              height="2.5rem"
              width="10.5rem"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
