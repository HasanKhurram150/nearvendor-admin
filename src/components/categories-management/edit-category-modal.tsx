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
import { useUpdateCategoryMutation } from "@/services/categories-api";
import { ICategory } from "@/services/categories-api/categories-api.types";
import { ApiErrorResponse } from "@/services/auth-api/auth-api.types";
import Select from "../form/Select";
import Loading from "../atoms/loading/loading";
import { useLanguage } from "../common/LanguageContext";

interface EditCategoryModalProps {
  onClose: () => void;
  category: ICategory;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Category name is required"),
  type: Yup.string().required("Type is required"),
});

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  onClose,
  category,
}) => {
  const { t } = useLanguage();
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: category.name || "",
      type: category.type || "",
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

  const onSubmit = async (formData: { name: string; type: string }) => {
    try {
      await updateCategory({
        id: category?.id,
        payload: {
          name: formData?.name,
          type: formData?.type,
        },
      }).unwrap();

      toast.success("Category updated successfully!");
      reset();
      onClose();
    } catch (error) {
      console.error("Error updating category:", error);
      const apiError = error as ApiErrorResponse;
      toast.error(
        apiError.data?.message || "Failed to update category. Please try again",
      );
    }
  };

  return (
    <div className="flex flex-col gap-10 items-start w-full">
      <div className="flex items-center gap-4">
        {/* <AddCategoryIcon /> */}
        <h2 className="font-semibold text-xl text-primary dark:text-white">
          {t("editCategory")}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-6 w-full">
          <div>
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              placeholder={("enterCategoryName")}
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
                  onChange={handleSelectType}
                  defaultValue={category.type}
                  className="dark:bg-dark-900"
                />
              )}
            />
            {errors.type && (
              <p className="mt-1 text-sm text-error-500">
                {errors.type.message}
              </p>
            )}
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
              btnText={isLoading ? "" : t("update")}
              icon={isLoading && <Loading size="sm" />}
              bgColor="#32AA00"
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
