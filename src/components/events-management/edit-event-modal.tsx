// "use client";
// import { AddCategoryIcon } from "@/icons";
// import React, { useEffect, useState } from "react";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";
// import GenericButton from "../atoms/generic-button/generic-button";
// import GenericSelectDropdown from "../atoms/generic-select-dropdown/generic-select-dropdown";
// import { IEvent } from "@/services/events-management-api/events-management-api.types";
// import dayjs from "dayjs";
// import { useUpdateEventMutation } from "@/services/events-management-api";
// import toast from "react-hot-toast";
// import * as Yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

// // const eventSchema = Yup.object().shape({
// //   name: Yup.string().required("Event name is required"),
// //   address: Yup.string().required("Location is required"),
// //   phoneNumber: Yup.string().optional(),
// //   telegram: Yup.string().url("Invalid URL").nullable(),
// //   date: Yup.string().required("Date is required"),
// //   type: Yup.mixed().oneOf(["free", "paid"]).required("Type is required"),
// //   link: Yup.string().url("Invalid URL").nullable(),
// // });

// const validationSchema = Yup.object().shape({
//   name: Yup.string()
//     .max(250, "Max 500 characters Allowed")
//     .required("Event Name is Required"),
//   phoneNumber: Yup.string().matches(
//     /^\+(?:[0-9]●?){6,14}[0-9]$/,
//     "Mobile number must be a valid international format (e.g., +923012345678)",
//   ),
//   // categoryId: Yup.string().required("Category is required"),
//   telegram: Yup.string()
//     .matches(
//       /^https:\/\/t\.me\/[a-zA-Z0-9_]+$/,
//       "Should Be Valid Telegram Link (e.g., https://t.me/TechConference2025)",
//     )
//     .nullable(),
//   address: Yup.string().required("Address is required"),
//   startDate: Yup.string().required("Start Time is Required"),
//   endDate: Yup.string().required("End Time is Required"),
//   startTime: Yup.string().required("Start Time is Required"),
//   endTime: Yup.string().required("End Time is Required"),
//   link: Yup.string().required("Event Link is Required"),
//   type: Yup.string().required("Event Type is Required"),
// });

// interface EditEventModalProps {
//   onClose: () => void;
//   event?: IEvent | null;
// }

// export const EditEventModal = ({ onClose, event }: EditEventModalProps) => {
//   const getTodayDate = (): string => {
//     const today = new Date();
//     const yyyy = today.getFullYear();
//     const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
//     const dd = String(today.getDate()).padStart(2, "0");
//     return `${yyyy}-${mm}-${dd}`;
//   };

//   const [updateEvent, { isLoading }] = useUpdateEventMutation();

//   const method = useForm<any>({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       name: "",
//       phoneNumber: "",
//       categoryId: "",
//       startDate: new Date(),
//       endDate: new Date(),
//       startTime: new Date(),
//       endTime: new Date(),
//       telegram: "",
//       type: "free",
//       link: "",
//     },
//     mode: "onChange",
//   });

//   const {handleSubmit} = method

//   const [formData, setFormData] = useState({
//     name: event?.name || "",
//     address: event?.address || "",
//     phoneNumber: event?.phoneNumber || "",
//     telegram: event?.telegram || "",
//     date: event?.date ? event.date : "",
//     // time: event?.startDateTime
//     //   ? dayjs(event.startDateTime).format("HH:mm")
//     //   : "",
//     type: event?.type || "free",
//     link: `https://noobit.pro/event/${event?.identifier}` || "",
//   });

//   useEffect(() => {
//     if (event) {
//       setFormData({
//         name: event.name || "",
//         address: event?.address || "",
//         phoneNumber: event.phoneNumber || "",
//         telegram: event.telegram || "",
//         date: event.startDateTime
//           ? dayjs(event.startDateTime).format("YYYY-MM-DD")
//           : "",
//         // time: event.startDateTime
//         //   ? dayjs(event.startDateTime).format("HH:mm")
//         //   : "",
//         type: event.type || "free",
//         link: event.link || "",
//       });
//     }
//   }, [event]);
//   const getCurrentTime = (): string => {
//     const now = new Date();
//     const hh = String(now.getHours()).padStart(2, "0");
//     const mm = String(now.getMinutes()).padStart(2, "0");
//     return `${hh}:${mm}`;
//   };

//   const [date, setDate] = useState<string>(getTodayDate());

//   const [time, setTime] = useState<string>(getCurrentTime());

//   const typeOptions = [
//     { label: "Free", value: "free" },
//     { label: "Paid", value: "paid" },
//   ];

//   const handleTypeChange = (value: string) => {
//     console.log("Selected type:", value);
//   };

//   const onSubmit = async (data: any) => {
//     if (!event?.id) return;

//     try {
//       await updateEvent({
//         id: event.id,
//         body: {
//           name: data.name,
//           phoneNumber: data.phoneNumber,
//           telegram: data.telegram,
//           address: data.address,
//           startDateTime: `${data.startDate}T${data.startTime}`,
//           endDateTime: `${data.endDate}T${data.endTime}`,
//           link: data.link,
//           type: data.type,
//         },
//       }).unwrap();

//       toast.success("Event updated successfully");
//       onClose();
//     } catch (error) {
//       toast.error("Failed to update event");
//       console.error("Update error:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-[2.5rem] items-start w-full">
//       <div className="flex items-center justify-start gap-4">
//         <AddCategoryIcon />{" "}
//         <p className="font-semibold text-[1.25rem] text-[#102445]">
//           Edit Side Event
//         </p>
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
//         <div className="space-y-6 w-full">
//           <div>
//             <Label>Event Name</Label>
//             <Input
//               id="name"
//               defaultValue={formData?.name}
//               type="eventName"
//               placeholder="Enter event name"
//               // registration={register("email")}
//               // error={errors.email?.message}
//             />
//           </div>
//           <div>
//             <Label>Location</Label>
//             <Input
//               id="address"
//               name="address"
//               type="location"
//               placeholder="Enter location"
//               defaultValue={formData?.address}
//             />
//           </div>
//           <div className="flex items-center gap-6 w-full">
//             <div className="w-[50%]">
//               <Label>Phone Number</Label>
//               <Input
//                 id="phoneNumber"
//                 placeholder="Enter number"
//                 defaultValue={formData?.phoneNumber}
//               />
//             </div>

//             <div className="w-[50%]">
//               <Label>Telegram</Label>
//               <Input
//                 id="telegram"
//                 placeholder="Enter telegram ID"
//                 defaultValue={formData?.telegram}
//               />
//             </div>
//           </div>
//           <div className="flex items-center gap-6">
//             {/* Date */}
//             <div className="flex flex-col gap-2 items-start justify-start w-[50%]">
//               <Label className="mb-0 w-[3rem]">Date</Label>
//               <input
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 className="rounded-lg border border-gray-200 px-4 py-2 text-blue-950 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//               />
//             </div>

//             {/* Time */}
//             {/* <div className="flex flex-col gap-2 items-start justify-start w-[50%]">
//               <Label className="mb-0 w-[3rem]">Time</Label>
//               <input
//                 type="time"
//                 value={time}
//                 onChange={(e) => setTime(e.target.value)}
//                 className="rounded-lg border border-gray-200 px-4 py-2 text-blue-950 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//               />
//             </div> */}
//           </div>
//           <div className="flex items-center gap-6 w-full">
//             <div className="w-[50%]">
//               <GenericSelectDropdown
//                 label="Type"
//                 options={typeOptions}
//                 defaultValue="free"
//                 onChange={handleTypeChange}
//               />
//             </div>

//             <div className="w-[50%]">
//               <Label>Link</Label>
//               <Input
//                 id="link"
//                 name="link"
//                 placeholder="Enter link"
//                 defaultValue={formData?.link}
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-4 justify-end">
//             <GenericButton
//               btnText="Cancel"
//               bgColor="transparent"
//               borderRadius="5rem"
//               color="#000"
//               height="2.5rem"
//               width="5.813rem"
//               handleClick={onClose}
//             />
//             <GenericButton
//               btnText="Update"
//               bgColor="#1862D4"
//               borderRadius="5rem"
//               color="#fff"
//               height="2.5rem"
//               width="6.75rem"
//               type={"submit"}
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

"use client";
import { AddCategoryIcon } from "@/icons";
import React, { useEffect } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import GenericButton from "../atoms/generic-button/generic-button";
import GenericSelectDropdown from "../atoms/generic-select-dropdown/generic-select-dropdown";
import { IEvent } from "@/services/events-management-api/events-management-api.types";
import dayjs from "dayjs";
import { useUpdateEventMutation } from "@/services/events-management-api";
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
  event?: IEvent | null;
}

export const EditEventModal = ({ onClose, event }: EditEventModalProps) => {
  const [updateEvent, { isLoading }] = useUpdateEventMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: event?.name || "",
      phoneNumber: event?.phoneNumber || "",
      telegram: event?.telegram || "",
      address: event?.address || "",
      startDate: event?.startDateTime
        ? dayjs(event.startDateTime).format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD"),
      endDate: event?.endDateTime
        ? dayjs(event.endDateTime).format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD"),
      startTime: event?.startDateTime
        ? dayjs(event.startDateTime).format("HH:mm")
        : dayjs().format("HH:mm"),
      endTime: event?.endDateTime
        ? dayjs(event.endDateTime).format("HH:mm")
        : dayjs().format("HH:mm"),
      link:
        event?.link || `https://noobit.pro/event/${event?.identifier}` || "",
      type: event?.type || "free",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (event) {
      reset({
        name: event.name || "",
        address: event.address || "",
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
    if (!event?.id) return;

    // const payload = {
    //   id: event?.id,
    //   body: {
    //     name: data.name,
    //     phoneNumber: data.phoneNumber,
    //     telegram: data.telegram,
    //     address: data.address,
    //     startDateTime: `${data.startDate}T${data.startTime}`,
    //     endDateTime: `${data.endDate}T${data.endTime}`,
    //     link: data.link,
    //     type: data.type,
    //   },
    // };

    try {
      // console.log({payload})
      await updateEvent({
        id: event.id,
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
              btnText={isLoading ? "" : "Update"}
              bgColor="#1862D4"
              borderRadius="5rem"
              color="#fff"
              height="2.5rem"
              width="6.75rem"
              type="submit"
              icon={isLoading && <Loading size="sm" />}
              disabled={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
