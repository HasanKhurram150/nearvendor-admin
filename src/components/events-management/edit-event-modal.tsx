"use client";
import { AddCategoryIcon } from "@/icons";
import React, { useEffect } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import GenericButton from "../atoms/generic-button/generic-button";
import GenericSelectDropdown from "../atoms/generic-select-dropdown/generic-select-dropdown";
import dayjs from "dayjs";
import {
  useUpdateEventMutation,
  useGetEventByIdQuery,
} from "@/services/events-management-api";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../atoms/loading/loading";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(250, "Max 500 characters Allowed")
    .required("Event Name is Required"),
  phoneNumber: Yup.string().matches(
    /^\+(?:[0-9]●?){6,14}[0-9]$/,
    "Mobile number must be a valid international format (e.g., +923012345678)",
  ),
  telegram: Yup.string()
    .matches(
      /^https:\/\/t\.me\/[a-zA-Z0-9_]+$/,
      "Should Be Valid Telegram Link (e.g., https://t.me/TechConference2025)",
    )
    .nullable(),
  address: Yup.string().required("Address is required"),
  startDate: Yup.string().required("Start Date is Required"),
  endDate: Yup.string().required("End Date is Required"),
  startTime: Yup.string().required("Start Time is Required"),
  endTime: Yup.string().required("End Time is Required"),
  link: Yup.string().required("Event Link is Required"),
  type: Yup.string().required("Event Type is Required"),
});

interface EditEventModalProps {
  onClose: () => void;
  eventId: string;
}

export const EditEventModal = ({ onClose, eventId }: EditEventModalProps) => {
  const {
    data: event,
    isLoading: isEventLoading,
    isError,
  } = useGetEventByIdQuery(eventId);
  const [updateEvent, { isLoading: isUpdateLoading }] =
    useUpdateEventMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      telegram: "",
      address: "",
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
      startTime: dayjs().format("HH:mm"),
      endTime: dayjs().format("HH:mm"),
      link: "",
      type: "free",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (event) {
      reset({
        name: event.name || "",
        address: event.location?.location || "",
        phoneNumber: event.phoneNumber || "",
        telegram: event.telegram || "",
        startDate: event.startDateTime
          ? dayjs(event.startDateTime).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
        endDate: event.endDateTime
          ? dayjs(event.endDateTime).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
        startTime: event.startDateTime
          ? dayjs(event.startDateTime).format("HH:mm")
          : dayjs().format("HH:mm"),
        endTime: event.endDateTime
          ? dayjs(event.endDateTime).format("HH:mm")
          : dayjs().format("HH:mm"),
        link: event.link || `https://noobit.pro/event/${event.identifier}`,
        type: event.type || "free",
      });
    }
  }, [event, reset]);

  const typeOptions = [
    { label: "Free", value: "free" },
    { label: "Paid", value: "paid" },
  ];

  const onSubmit = async (data: any) => {
    if (!eventId) return;

    try {
      await updateEvent({
        id: eventId,
        body: {
          name: data.name,
          phoneNumber: data.phoneNumber,
          telegram: data.telegram,
          address: data.address,
          startDateTime: `${data.startDate}T${data.startTime}`,
          endDateTime: `${data.endDate}T${data.endTime}`,
          link: data.link,
          type: data.type,
        },
      }).unwrap();

      toast.success("Event updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update event");
      console.error("Update error:", error);
    }
  };

  if (isEventLoading) {
    return <Loading size="lg" />;
  }

  if (isError) {
    return <div>Error loading event data</div>;
  }

  return (
    <div className="flex flex-col gap-[2.5rem] items-start w-full">
      <div className="flex items-center justify-start gap-4">
        <AddCategoryIcon />{" "}
        <p className="font-semibold text-[1.25rem] text-[#102445]">
          Edit Side Event
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-6 w-full">
          <div>
            <Label>Event Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter event name"
              registration={register("name")}
              error={errors.name?.message}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter location"
              registration={register("address")}
              error={errors.address?.message}
            />
          </div>
          <div className="flex items-center gap-6 w-full">
            <div className="w-[50%]">
              <Label>Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="Enter number"
                registration={register("phoneNumber")}
                error={errors.phoneNumber?.message}
              />
            </div>

            <div className="w-[50%]">
              <Label>Telegram</Label>
              <Input
                id="telegram"
                placeholder="Enter telegram ID"
                registration={register("telegram")}
                error={errors.telegram?.message}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-[50%]">
              <Label>Start Date</Label>
              <Input
                id="startDate"
                type="date"
                registration={register("startDate")}
                error={errors.startDate?.message}
              />
            </div>
            <div className="w-[50%]">
              <Label>Start Time</Label>
              <Input
                id="startTime"
                type="time"
                registration={register("startTime")}
                error={errors.startTime?.message}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-[50%]">
              <Label>End Date</Label>
              <Input
                id="endDate"
                type="date"
                registration={register("endDate")}
                error={errors.endDate?.message}
              />
            </div>
            <div className="w-[50%]">
              <Label>End Time</Label>
              <Input
                id="endTime"
                type="time"
                registration={register("endTime")}
                error={errors.endTime?.message}
              />
            </div>
          </div>
          <div className="flex items-center gap-6 w-full">
            <div className="w-[50%]">
              <GenericSelectDropdown
                label="Type"
                options={typeOptions}
                defaultValue={event?.type || "free"}
                onChange={(value) => setValue("type", value)}
              />
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>

            <div className="w-[50%]">
              <Label>Link</Label>
              <Input
                id="link"
                type="text"
                placeholder="Enter link"
                registration={register("link")}
                error={errors.link?.message}
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
              type="button"
            />
            <GenericButton
              btnText={isUpdateLoading ? "" : "Update"}
              bgColor="#1862D4"
              borderRadius="5rem"
              color="#fff"
              height="2.5rem"
              width="6.75rem"
              type="submit"
              icon={isUpdateLoading && <Loading size="sm" />}
              disabled={isUpdateLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
