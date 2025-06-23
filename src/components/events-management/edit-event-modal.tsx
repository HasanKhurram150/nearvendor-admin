"use client";
import { AddCategoryIcon } from "@/icons";
import React, { useEffect, useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import GenericButton from "../atoms/generic-button/generic-button";
import GenericSelectDropdown from "../atoms/generic-select-dropdown/generic-select-dropdown";
import { IEvent } from "@/services/events-management-api/events-management-api.types";
import dayjs from "dayjs";

interface EditEventModalProps {
  onClose: () => void;
  event?: IEvent | null;
}

export const EditEventModal = ({ onClose, event }: EditEventModalProps) => {
  const getTodayDate = (): string => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [formData, setFormData] = useState({
    name: event?.name || "",
    location: event?.location?.location || "",
    phoneNumber: event?.phoneNumber || "",
    telegram: event?.telegram || "",
    date: event?.startDateTime
      ? dayjs(event.startDateTime).format("YYYY-MM-DD")
      : "",
    time: event?.startDateTime
      ? dayjs(event.startDateTime).format("HH:mm")
      : "",
    type: event?.type || "free",
    link: event?.link || "",
  });

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || "",
        location: event?.location?.location || "",
        phoneNumber: event.phoneNumber || "",
        telegram: event.telegram || "",
        date: event.startDateTime
          ? dayjs(event.startDateTime).format("YYYY-MM-DD")
          : "",
        time: event.startDateTime
          ? dayjs(event.startDateTime).format("HH:mm")
          : "",
        type: event.type || "free",
        link: event.link || "",
      });
    }
  }, [event]);
  const getCurrentTime = (): string => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const [date, setDate] = useState<string>(getTodayDate());

  const [time, setTime] = useState<string>(getCurrentTime());

  const typeOptions = [
    { label: "Free", value: "free" },
    { label: "Paid", value: "paid" },
  ];

  const handleTypeChange = (value: string) => {
    console.log("Selected type:", value);
  };
  return (
    <div className="flex flex-col gap-[2.5rem] items-start w-full">
      <div className="flex items-center justify-start gap-4">
        <AddCategoryIcon />{" "}
        <p className="font-semibold text-[1.25rem] text-[#102445]">
          Edit Side Event
        </p>
      </div>
      <form className="w-full">
        <div className="space-y-6 w-full">
          <div>
            <Label>Event Name</Label>
            <Input
              id="name"
              defaultValue={formData?.name}
              type="eventName"
              placeholder="Enter event name"
              // registration={register("email")}
              // error={errors.email?.message}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input id="location" type="location" placeholder="Enter location" />
          </div>
          <div className="flex items-center gap-6 w-full">
            <div className="w-[50%]">
              <Label>Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="Enter number"
                defaultValue={formData?.phoneNumber}
              />
            </div>

            <div className="w-[50%]">
              <Label>Telegram</Label>
              <Input id="telegram" placeholder="Enter telegram ID" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            {/* Date */}
            <div className="flex flex-col gap-2 items-start justify-start w-[50%]">
              <Label className="mb-0 w-[3rem]">Date</Label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-blue-950 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Time */}
            <div className="flex flex-col gap-2 items-start justify-start w-[50%]">
              <Label className="mb-0 w-[3rem]">Time</Label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-blue-950 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-6 w-full">
            <div className="w-[50%]">
              <GenericSelectDropdown
                label="Type"
                options={typeOptions}
                defaultValue="free"
                onChange={handleTypeChange}
              />
            </div>

            <div className="w-[50%]">
              <Label>Link</Label>
              <Input id="link" placeholder="Enter link" />
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
