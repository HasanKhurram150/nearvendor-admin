"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { categoryColumns } from "./columns";
import Loading from "../atoms/loading/loading";
import GenericButton from "../atoms/generic-button/generic-button";
import { EditIcon, PlusIcon, TrashBinIcon } from "@/icons";
import GenericSearchField from "../atoms/generic-search-field/generic-search-field";
import { GenericModal } from "../atoms/generic-modal";
import { AddCategoryModal } from "./add-category-modal";
import { EditCategoryModal } from "./edit-category-modal";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/services/categories-api";
import type { ICategory } from "@/services/categories-api/categories-api.types";
import toast from "react-hot-toast";
import type { ApiErrorResponse } from "@/services/auth-api/auth-api.types";

const CategoriesManagement: React.FC = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
    null,
  );

  // API hooks
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  // Memoized filtered categories
  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [categories, searchQuery]);

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
          <TableCell
            colSpan={categoryColumns.length}
            className="text-center py-8"
          >
            <div className="flex justify-center">
              <Loading size="lg" />
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (filteredCategories.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={categoryColumns.length}
            className="text-center py-8"
          >
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
          {category.type}
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
    <div className="flex flex-col gap-10 items-start w-full">
      {/* Search and Add Button Section */}
      <div className="flex flex-wrap gap-4 items-center w-full">
        <GenericSearchField
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name"
          aria-label="Search categories"
        />
        <GenericButton
          icon={<PlusIcon />}
          btnText="Add New"
          bgColor="#1862D4"
          color="#fff"
          height="2.5rem"
          width="7.188rem"
          handleClick={handleOpenAddModal}
          aria-label="Add new category"
        />
      </div>

      {/* Categories Table */}
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] w-full">
        <div className="max-w-full overflow-x-auto">
          <Table aria-label="Categories management table">
            <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-4">
              <TableRow>
                {categoryColumns.map((col) => (
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

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {renderTableContent()}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modals */}
      <GenericModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        aria-label="Add category modal"
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
  );
};

export default React.memo(CategoriesManagement);
