"use client";
import { DollarLineIcon } from "@/icons";
import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import GenericButton from "../atoms/generic-button/generic-button";
import { IPrice } from "@/services/packages-api/packages-api.types";
import {
  useGetPackageByIdQuery,
  useUpdatePackagePriceMutation,
} from "@/services/packages-api";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../atoms/loading/loading";
import { ApiErrorResponse } from "@/services/auth-api/auth-api.types";
import { useLanguage } from "../common/LanguageContext";

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .min(0, "Amount cannot be negative")
    .typeError("Amount must be a number"),
});

export const EditPricingModal = ({
  price,
  packageId,
  onClose,
}: {
  price: IPrice;
  packageId: string;
  onClose: () => void;
}) => {
  const { t } = useLanguage();
  const { data: packageData, isLoading: isPackageLoading } =
    useGetPackageByIdQuery(packageId);
  const [updatePrice, { isLoading }] = useUpdatePackagePriceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      amount: price?.amount,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: { amount: number }) => {
    try {
      await updatePrice({
        packageId,
        priceId: price?.id,
        amount: data?.amount,
      }).unwrap();
      toast.success("Price updated successfully");
      onClose();
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      if (apiError.data && apiError.data.message) {
        toast.error(apiError.data.message);
      } else {
        toast.error("Failed to update price. Please try again");
      }
    }
  };

  if (isPackageLoading) return <Loading size="sm" />;

  return (
    <div className="flex flex-col gap-[2.5rem] items-start w-full">
      <div className="flex items-center justify-start gap-4">
        <DollarLineIcon />{" "}
        <p className="font-semibold text-[1.25rem] text-[#102445]">
          {t("editPrice")}
        </p>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6 py-2 w-full overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            {" "}
            <div>
              <Label>{t("amount")}</Label>
              <Input
                id="amount"
                type="text"
                placeholder={t("enterAmount")}
                registration={register("amount")}
                error={errors.amount?.message}
              />
            </div>{" "}
          </div>

          <div className="flex items-center gap-4 justify-end">
            <GenericButton
              btnText={t("cancel")}
              bgColor="transparent"
              borderRadius="5rem"
              color="#000"
              height="2.5rem"
              width="5.813rem"
              handleClick={onClose}
            />
            <GenericButton
              btnText={isLoading ? "" : t("update")}
              bgColor="#1862D4"
              borderRadius="5rem"
              color="#fff"
              height="2.5rem"
              width="7rem"
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
