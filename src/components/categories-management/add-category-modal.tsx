"use client";
import React from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { AddCategoryIcon } from "@/icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import GenericButton from "../atoms/generic-button/generic-button";
// import { useCreateCategoryMutation } from "@/services/categories-api";
import { ApiErrorResponse } from "@/services/auth/auth-api/auth-api.types";
import Select from "../form/Select";
import Loading from "../atoms/loading/loading";
import { useLanguage } from "../common/LanguageContext";

interface AddCategoryModalProps {
  onClose: () => void;
}

type CategoryFormValues = {
  name: string;
  type: string;
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Category name is required")
    .max(50, "Category name must be at most 50 characters"),
  // type: Yup.string(),
  type: Yup.string().required("Type is required"),
});

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  onClose,
}) => {
  const { t } = useLanguage();
  // const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [createCategory, { isLoading }] = [
    async (...args: any[]) => ({ unwrap: () => {} }),
    { isLoading: false },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      type: "none",
    },
    mode: "onChange",
  });

  const handleSelectType = (value: string) => {
    setValue("type", value, { shouldValidate: true });
  };

  const typeOptions = [
    { label: t("tech"), value: "technology" },
    { label: t("general"), value: "general" },
    { label: t("none"), value: "none" },
  ];

  const onSubmit = async (formData: CategoryFormValues) => {
    try {
      const typeValue = formData?.type === "none" ? undefined : formData?.type;
      const requestData = {
        name: formData?.name,
        type: typeValue,
      };
      // @ts-ignore
      await createCategory(requestData).unwrap();
      toast.success("Category created successfully!");
      reset();
      onClose();
    } catch (error) {
      console.error("Error creating category:", error);
      const apiError = error as ApiErrorResponse;
      toast.error(
        apiError.data?.message || "Failed to create category. Please try again",
      );
    }
  };

  return (
    <div className="flex flex-col gap-10 items-start w-full">
      <div className="flex items-center gap-4">
        {/* <AddCategoryIcon /> */}
        <h2 className="font-semibold text-xl text-primary dark:text-white">
          {t("addNewCategory")}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-6 w-full">
          <div>
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              placeholder={t("enterCategoryName")}
              registration={register("name")}
              error={errors.name?.message}
            />
          </div>

          <div>
            <Label htmlFor="type">{t("type")}</Label>
            <Controller
              name="type"
              control={control}
              render={() => (
                <Select
                  options={typeOptions}
                  placeholder={t("selectType")}
                  // onChange={handleSelectType}
                  onChange={(value) => handleSelectType(value as string)}
                  className="dark:bg-dark-900"
                />
              )}
            />
            {/* {errors.type && (
              <p className="mt-1 text-sm text-error-500">
                {errors.type.message}
              </p>
            )} */}
          </div>

          <div className="flex items-center gap-4 justify-end">
            <GenericButton
              btnText={t("cancel")}
              bgColor="transparent"
              borderRadius="5rem"
              color="white"
              height="2.5rem"
              width="5.813rem"
              handleClick={onClose}
              type="button"
            />
            <GenericButton
              btnText={isLoading ? "" : t("save")}
              icon={isLoading && <Loading size="sm" />}
              bgColor="#FFFF00"
              borderRadius="5rem"
              color="#fff"
              height="2.5rem"
              width="6.75rem"
              type="submit"
              disabled={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
