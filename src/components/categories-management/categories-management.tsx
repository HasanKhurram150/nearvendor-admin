"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useCategoryColumns } from "./columns";
import Loading from "../atoms/loading/loading";
import GenericButton from "../atoms/generic-button/generic-button";
import { EditIcon, PlusIcon, TrashBinIcon } from "@/icons";
import GenericSearchField from "../atoms/generic-search-field/generic-search-field";
import { GenericModal } from "../atoms/generic-modal";
import { AddCategoryModal } from "./add-category-modal";
import { EditCategoryModal } from "./edit-category-modal";
// import {
//   useDeleteCategoryMutation,
//   useGetCategoriesQuery,
// } from "@/services/categories-api";
// import type { ICategory } from "@/services/categories-api/categories-api.types";
type ICategory = any;
import toast from "react-hot-toast";
import type { ApiErrorResponse } from "@/services/auth/auth-api/auth-api.types";
import Select from "../form/Select";
import { useLanguage } from "../common/LanguageContext";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Pagination from "@/components/tables/Pagination";

const CategoriesManagement: React.FC = () => {
  // State management
  const { t } = useLanguage();
  const columns = useCategoryColumns();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined,
  );
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
    null,
  );

  // API hooks
  // const { data: categories, isLoading } = useGetCategoriesQuery({
  //   type: selectedType,
  // });
  // const [deleteCategory, { isLoading: isDeleting }] =
  //   useDeleteCategoryMutation();
  const categories: any[] = [];
  const isLoading = false;
  const [deleteCategory, { isLoading: isDeleting }] = [
    async (...args: any[]) => ({ unwrap: () => {} }),
    { isLoading: false },
  ];

  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [categories, searchQuery]);

  // Add the type options (same as in EditCategoryModal)
  const typeOptions = [
    { label: t("allTypes"), value: "" },
    { label: t("tech"), value: "technology" },
    { label: t("general"), value: "general" },
  ];

  const handleTypeChange = (value: string) => {
    setSelectedType(value || undefined);
  };

  // Event handlers
  const handleOpenAddModal = useCallback(() => setIsAddModalOpen(true), []);
  const handleCloseAddModal = useCallback(() => setIsAddModalOpen(false), []);

  const handleOpenEditModal = useCallback((category: ICategory) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setSelectedCategory(null);
  }, []);

  const handleDeleteCategory = useCallback(
    async (id: string) => {
      if (!id) return;

      setDeletingCategoryId(id);
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category deleted successfully!");
      } catch (error) {
        const apiError = error as ApiErrorResponse;
        toast.error(
          apiError.data?.message ||
            "Failed to delete category. Please try again.",
        );
      } finally {
        setDeletingCategoryId(null);
      }
    },
    [deleteCategory],
  );

  // Render helpers
  const renderTableContent = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="text-center py-8">
            <div className="flex justify-center">
              <Loading size="lg" className="border-[#FFFF00]" />
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (filteredCategories.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="text-center py-8">
            <span className="text-gray-500 dark:text-gray-400 text-lg">
              {searchQuery
                ? "No matching categories found"
                : "No categories available"}
            </span>
          </TableCell>
        </TableRow>
      );
    }

    return filteredCategories.map((category) => (
      <TableRow key={category.id}>
        <TableCell className="pl-6 pr-3 py-5 text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
          {category.name}
        </TableCell>
        <TableCell className="px-3 py-5 text-[#201D1D] text-base dark:text-white/90 min-w-[8rem]">
          {category?.type ? category.type : "N/A"}
        </TableCell>
        <TableCell className="pl-3 pr-6 py-5 text-right min-w-[10rem]">
          <div className="flex justify-end gap-2">
            <GenericButton
              icon={<EditIcon />}
              aria-label={`Edit ${category.name}`}
              handleClick={() => handleOpenEditModal(category)}
            />
            <GenericButton
              icon={
                deletingCategoryId === category.id ? (
                  <Loading size="sm" />
                ) : (
                  <TrashBinIcon />
                )
              }
              aria-label={`Delete ${category.name}`}
              handleClick={() => handleDeleteCategory(category.id)}
              disabled={deletingCategoryId === category.id && isDeleting}
            />
          </div>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <PageBreadcrumb
        pageTitle={t("categoriesManagement")}
        info={t("manageCategories")}
      />
      <div className="flex flex-col gap-10 items-start w-full">
        {/* Search and Add Button Section */}
        <div className="flex flex-wrap gap-4 items-center w-full">
          <GenericSearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t("searchByName")}
            aria-label="Search categories"
          />
          <div className="w-48">
            <Select
              options={typeOptions}
              placeholder={t("filterByType")}
              onChange={handleTypeChange}
              defaultValue={selectedType || ""}
              className="dark:bg-dark-900"
            />
          </div>
          <GenericButton
            icon={<PlusIcon />}
            btnText={t("addNew")}
            bgColor="#FFFF00"
            color="#fff"
            height="2.5rem"
            width="7.188rem"
            handleClick={handleOpenAddModal}
            aria-label="Add new category"
          />
        </div>

        {/* Categories Table */}
        <div className="overflow-hidden dashboard-card min-h-[calc(100vh-200px)] w-full pb-[1.5rem]">
          <div className="max-w-full overflow-x-auto">
            <Table hoverable aria-label="Categories management table">
              <TableHeader className="border-b border-[#1D1C1C] bg-white/[0.02] px-4">
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col.id}
                      isHeader
                      className={`py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white ${col.className} last:text-right first:pl-6 last:pr-6`}
                    >
                      {col.header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-[#1D1C1C]">
                {renderTableContent()}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex flex-col items-center justify-between gap-3 px-6 sm:flex-row">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredCategories.length} categories
            </span>
            <Pagination
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
            />
          </div>
        </div>

        {/* Modals */}
        <GenericModal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          aria-label={t("addCategoryModal")}
        >
          <AddCategoryModal onClose={handleCloseAddModal} />
        </GenericModal>

        <GenericModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          aria-label="Edit category modal"
        >
          {selectedCategory && (
            <EditCategoryModal
              onClose={handleCloseEditModal}
              category={selectedCategory}
            />
          )}
        </GenericModal>
      </div>
    </>
  );
};

export default React.memo(CategoriesManagement);
