// "use client";
// import { AddCategoryIcon } from "@/icons";
// import React, { useEffect } from "react";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";
// import GenericButton from "../atoms/generic-button/generic-button";
// import GenericSelectDropdown from "../atoms/generic-select-dropdown/generic-select-dropdown";
// import dayjs from "dayjs";
// // import {
// //   useUpdateEventMutation,
// //   useGetEventByIdQuery,
// // } from "@/services/events-management-api";
// import toast from "react-hot-toast";
// import * as Yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import Loading from "../atoms/loading/loading";
// import { useLanguage } from "../common/LanguageContext";

// const validationSchema = Yup.object().shape({
//   name: Yup.string()
//     .max(250, "Max 500 characters Allowed")
//     .required("Event Name is Required"),
//   phoneNumber: Yup.string().matches(
//     /^\+(?:[0-9]●?){6,14}[0-9]$/,
//     "Mobile number must be a valid international format (e.g., +923012345678)",
//   ),
//   telegram: Yup.string()
//     .matches(
//       /^https:\/\/t\.me\/[a-zA-Z0-9_]+$/,
//       "Should Be Valid Telegram Link (e.g., https://t.me/TechConference2025)",
//     )
//     .nullable(),
//   address: Yup.string().required("Address is required"),
//   startDate: Yup.string().required("Start Date is Required"),
//   endDate: Yup.string().required("End Date is Required"),
//   startTime: Yup.string().required("Start Time is Required"),
//   endTime: Yup.string().required("End Time is Required"),
//   link: Yup.string().required("Event Link is Required"),
//   type: Yup.string().required("Event Type is Required"),
// });

// interface EditEventModalProps {
//   onClose: () => void;
//   eventId: string;
// }

// export const EditEventModal = ({ onClose, eventId }: EditEventModalProps) => {
//   const { t } = useLanguage();
//   // const {
//   //   data: event,
//   //   isLoading: isEventLoading,
//   //   isError,
//   // } = useGetEventByIdQuery(eventId);
//   // const [updateEvent, { isLoading: isUpdateLoading }] =
//   //   useUpdateEventMutation();
//   const event: any = null;
//   const isEventLoading = false;
//   const isError = false;
//   const [updateEvent, { isLoading: isUpdateLoading }] = [async (...args: any[]) => ({ unwrap: () => {} }), { isLoading: false }];

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       name: "",
//       phoneNumber: "",
//       telegram: "",
//       address: "",
//       startDate: dayjs().format("YYYY-MM-DD"),
//       endDate: dayjs().format("YYYY-MM-DD"),
//       startTime: dayjs().format("HH:mm"),
//       endTime: dayjs().format("HH:mm"),
//       link: "",
//       type: "free",
//     },
//     mode: "onChange",
//   });

//   useEffect(() => {
//     if (event) {
//       reset({
//         name: event.name || "",
//         address: event.location?.location || "",
//         phoneNumber: event.phoneNumber || "",
//         telegram: event.telegram || "",
//         startDate: event.startDateTime
//           ? dayjs(event.startDateTime).format("YYYY-MM-DD")
//           : dayjs().format("YYYY-MM-DD"),
//         endDate: event.endDateTime
//           ? dayjs(event.endDateTime).format("YYYY-MM-DD")
//           : dayjs().format("YYYY-MM-DD"),
//         startTime: event.startDateTime
//           ? dayjs(event.startDateTime).format("HH:mm")
//           : dayjs().format("HH:mm"),
//         endTime: event.endDateTime
//           ? dayjs(event.endDateTime).format("HH:mm")
//           : dayjs().format("HH:mm"),
//         link: event.link || `https://cfcy.io/event/${event.identifier}`,
//         type: event.type || "free",
//       });
//     }
//   }, [event, reset]);

//   const typeOptions = [
//     { label: t("free"), value: "free" },
//     { label: t("paid"), value: "paid" },
//   ];

//   const onSubmit = async (data: any) => {
//     if (!eventId) return;

//     try {
//       await updateEvent({
//         id: eventId,
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

//   if (isEventLoading) {
//     return <Loading size="lg" className="border-[#FFFF00]" />;
//   }

//   if (isError) {
//     return <div>Error loading event data</div>;
//   }

//   return (
//     <div className="flex flex-col items-start gap-[2.5rem] w-full">
//       <div className="flex justify-start items-center gap-4">
//         <AddCategoryIcon />{" "}
//         <p className="font-semibold text-[#102445] text-[1.25rem]">
//           {t("editSideEvent")}
//         </p>
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
//         <div className="space-y-6 w-full">
//           <div>
//             <Label>{t("eventName")}</Label>
//             <Input
//               id="name"
//               type="text"
//               placeholder={t("enterEventName")}
//               registration={register("name")}
//               error={errors.name?.message}
//             />
//           </div>
//           <div>
//             <Label>{t("location")}</Label>
//             <Input
//               id="address"
//               type="text"
//               placeholder={t("enterLocation")}
//               registration={register("address")}
//               error={errors.address?.message}
//             />
//           </div>
//           <div className="flex items-center gap-6 w-full">
//             <div className="w-[50%]">
//               <Label>{t("phoneNumber")}</Label>
//               <Input
//                 id="phoneNumber"
//                 placeholder={t("enterNumber")}
//                 registration={register("phoneNumber")}
//                 error={errors.phoneNumber?.message}
//               />
//             </div>

//             <div className="w-[50%]">
//               <Label>{t("telegram")}</Label>
//               <Input
//                 id="telegram"
//                 placeholder="Enter telegram ID"
//                 registration={register("telegram")}
//                 error={errors.telegram?.message}
//               />
//             </div>
//           </div>
//           <div className="flex items-center gap-6">
//             <div className="w-[50%]">
//               <Label>{t("startDate")}</Label>
//               <Input
//                 id="startDate"
//                 type="date"
//                 registration={register("startDate")}
//                 error={errors.startDate?.message}
//               />
//             </div>
//             <div className="w-[50%]">
//               <Label>{t("startTime")}</Label>
//               <Input
//                 id="startTime"
//                 type="time"
//                 registration={register("startTime")}
//                 error={errors.startTime?.message}
//               />
//             </div>
//           </div>
//           <div className="flex items-center gap-6">
//             <div className="w-[50%]">
//               <Label>{t("endDate")}</Label>
//               <Input
//                 id="endDate"
//                 type="date"
//                 registration={register("endDate")}
//                 error={errors.endDate?.message}
//               />
//             </div>
//             <div className="w-[50%]">
//               <Label>{t("endTime")}</Label>
//               <Input
//                 id="endTime"
//                 type="time"
//                 registration={register("endTime")}
//                 error={errors.endTime?.message}
//               />
//             </div>
//           </div>
//           <div className="flex items-center gap-6 w-full">
//             <div className="w-[50%]">
//               <GenericSelectDropdown
//                 label={t("type")}
//                 options={typeOptions}
//                 defaultValue={event?.type || "free"}
//                 onChange={(value) => setValue("type", value)}
//               />
//               {errors.type && (
//                 <p className="mt-1 text-red-500 text-sm">
//                   {errors.type.message}
//                 </p>
//               )}
//             </div>

//             <div className="w-[50%]">
//               <Label>{t("link")}</Label>
//               <Input
//                 id="link"
//                 type="text"
//                 placeholder={t("enterLink")}
//                 registration={register("link")}
//                 error={errors.link?.message}
//               />
//             </div>
//           </div>

//           <div className="flex justify-end items-center gap-4">
//             <GenericButton
//               btnText={t("cancel")}
//               bgColor="transparent"
//               borderRadius="5rem"
//               color="#000"
//               height="2.5rem"
//               width="5.813rem"
//               handleClick={onClose}
//               type="button"
//             />
//             <GenericButton
//               btnText={isUpdateLoading ? "" : t("update")}
//               bgColor="#FFFF00"
//               borderRadius="5rem"
//               color="#fff"
//               height="2.5rem"
//               width="6.75rem"
//               type="submit"
//               icon={isUpdateLoading && <Loading size="sm" />}
//               disabled={isUpdateLoading}
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };
