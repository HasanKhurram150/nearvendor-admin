"use client";
import { AddCalendarIcon, AddCategoryIcon } from "@/icons";
import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import GenericButton from "../atoms/generic-button/generic-button";
import TextArea from "../form/input/TextArea";
import { ProfilePhotoUpload } from "../atoms";
import ColorPicker from "./color-picker";

export const EditCalendarModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex flex-col gap-[2.5rem] items-start w-full">
      <div className="flex items-center justify-start gap-4">
        <AddCalendarIcon />{" "}
        <p className="font-semibold text-[1.25rem] text-[#102445]">
          Edit Calendar
        </p>
      </div>
      <form className="w-full">
        <div className="space-y-6 py-2 w-full max-h-[calc(100vh-300px)] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {" "}
            <div>
              <Label>Name</Label>
              <Input
                id="calendarName"
                type="text"
                placeholder="Enter calendar name"
                // registration={register("email")}
                // error={errors.email?.message}
              />
            </div>{" "}
            <div>
              <Label>Theme Color</Label>

              <ColorPicker />
            </div>{" "}
            <div className="col-span-1 md:col-span-2">
              {" "}
              <div>
                <Label>Description</Label>
                <TextArea
                  rows={3}
                  // value={messageTwo}
                  error
                  placeholder="Brief description of the calendar"
                  // onChange={(value) => setMessageTwo(value)}
                  // hint="Brief description of the calendar"
                />
              </div>
            </div>
            <ProfilePhotoUpload label="Cover Image" />
            <ProfilePhotoUpload label="Profile Image" />
            <div>
              <Label>Location</Label>
              <Input
                id="location"
                type="text"
                placeholder="Enter your location"
                // registration={register("email")}
                // error={errors.email?.message}
              />
            </div>{" "}
            <div>
              <Label>Website Link</Label>
              <Input
                id="website"
                type="text"
                placeholder="Enter your web link"
                // registration={register("email")}
                // error={errors.email?.message}
              />
            </div>{" "}
            <div>
              <Label>Twitter</Label>
              <Input
                id="twitter"
                type="text"
                placeholder="Enter your twitter"
              />
            </div>
            <div>
              <Label>Instagram</Label>
              <Input
                id="instagram"
                type="text"
                placeholder="Enter your instagram"
              />
            </div>
            <div>
              <Label>Youtube</Label>
              <Input
                id="youtube"
                type="text"
                placeholder="Enter your youtube"
                // registration={register("email")}
                // error={errors.email?.message}
              />
            </div>{" "}
            <div>
              <Label>Tiktok</Label>
              <Input id="tiktok" type="text" placeholder="Enter your tiktok" />
            </div>
            <div>
              <Label>LinkedIn</Label>
              <Input
                id="linkedin"
                type="text"
                placeholder="Enter your linkedin"
              />
            </div>
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
              btnText="Update Calendar"
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
