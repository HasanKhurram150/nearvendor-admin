"use client";
import React, { useEffect } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import {
  useAddAdminEmailMutation,
  useGetAdminEmailQuery,
} from "@/services/auth-api";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../atoms/loading/loading";
import { ApiErrorResponse } from "@/services/auth-api/auth-api.types";
import { useLanguage } from "../common/LanguageContext";
import PageBreadcrumb from "../common/PageBreadCrumb";

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const Settings: React.FC = () => {
  const { t } = useLanguage();
  const { data: adminEmailData, isLoading: isEmailLoading } =
    useGetAdminEmailQuery();
  const [updateEmail, { isLoading: isUpdating }] = useAddAdminEmailMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailValidationSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (adminEmailData?.value) {
      setValue("email", adminEmailData?.value);
    }
  }, [adminEmailData, setValue]);

  const onSubmit = async (data: { email: string }) => {
    try {
      await updateEmail({ email: data?.email }).unwrap();
      toast.success("Admin email updated successfully");
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      if (apiError.data && apiError.data.message) {
        toast.error(apiError.data.message);
      } else {
        toast.error("Failed to update admin email. Please try again");
      }
    }
  };

  return (
    <>
      <PageBreadcrumb pageTitle={t("settings")} info={t("manageSettings")} />
      <div className="flex flex-col gap-10 items-start w-full">
        <div className="rounded-2xl bg-white dark:bg-white/[0.03] min-h-[20rem] w-full p-[1.5rem]">
          <p className="text-gray-600 mb-4">{adminEmailData?.description}</p>
          {isEmailLoading ? (
            <div className="flex justify-center py-8">
              <Loading size="lg" className="border-[#50FF56]" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center sm:items-end flex-col sm:flex-row gap-6 px-2 pb-3 w-full xl:w-[50%]">
                <div className="flex flex-col w-full">
                  <Label>{t("email")} </Label>
                  <Input
                    type="text"
                    placeholder={t("enterEmail")}
                    registration={register("email")}
                    error={errors.email?.message}
                    disabled={isUpdating}
                  />
                </div>

                <button className="flex items-center justify-center text-white btn-bg h-[3.5rem] w-[10rem] rounded-xl">
                  {isUpdating ? <Loading size="sm" /> : t("update")}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
