"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit2, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { shopCategoriesAPI } from "@/services/shops/shop-categories-api";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Loading from "../atoms/loading/loading";
import toast from "react-hot-toast";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import dayjs from "dayjs";

const ShopCategoriesManagement: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", iconUrl: "", parentId: "" });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["shop-categories"],
    queryFn: () => shopCategoriesAPI.getAllShopCategories(),
  });

  const categories = data?.success ? data.data : [];

  const createMutation = useMutation({
    mutationFn: (data: any) => shopCategoriesAPI.createShopCategory(data),
    onSuccess: () => {
      toast.success("Shop category created successfully");
      queryClient.invalidateQueries({ queryKey: ["shop-categories"] });
      closeModal();
    },
    onError: () => toast.error("Failed to create category"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      shopCategoriesAPI.updateShopCategory(id, data),
    onSuccess: () => {
      toast.success("Shop category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["shop-categories"] });
      closeModal();
    },
    onError: () => toast.error("Failed to update category"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => shopCategoriesAPI.deleteShopCategory(id),
    onSuccess: () => {
      toast.success("Shop category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["shop-categories"] });
    },
    onError: () => toast.error("Failed to delete category"),
  });

  const openModal = (category: any = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name || "",
        iconUrl: category.iconUrl || "",
        parentId: category.parentId || "",
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", iconUrl: "", parentId: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: "", iconUrl: "", parentId: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return toast.error("Name is required");

    const submitData = {
      ...formData,
      parentId: formData.parentId || null,
    };

    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this category?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <PageBreadcrumb
        pageTitle={"Shop Categories"}
        counter={true}
        counterText="Total"
        counterValue={categories.length || 0}
      />

      <div className="overflow-hidden dashboard-card min-h-[calc(100vh-200px)] pb-[1.5rem]">
        <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-[#1D1C1C]">
          <h3 className="text-lg font-semibold text-white">Categories</h3>
          <Button onClick={() => openModal()} startIcon={<Plus size={16} />}>
            Add Category
          </Button>
        </div>

        <div className="max-w-full overflow-x-auto">
          <Table hoverable>
            <TableHeader className="border-b border-[#1D1C1C] bg-white/[0.02] px-[1rem]">
              <TableRow>
                <TableCell isHeader className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white">Name</TableCell>
                <TableCell isHeader className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white">Shops Count</TableCell>
                <TableCell isHeader className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white">Created At</TableCell>
                <TableCell isHeader className="py-3 px-6 font-medium text-[#201D1D99] text-end text-base dark:text-white">Actions</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-[#1D1C1C]">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <Loading size="lg" className="border-brand-500 mx-auto" />
                  </TableCell>
                </TableRow>
              ) : categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                    No shop categories found
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category: any) => (
                  <TableRow
                    key={category.id}
                    onClick={() => router.push(`/shops/${category.id}`)}
                    className="cursor-pointer hover:bg-white/[0.02]"
                  >
                    <TableCell className="px-6 py-4 text-sm text-white">
                      {category.name}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-400">
                      {category.shopCount || 0}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-400">
                      {dayjs(category.createdAt).format("DD MMM, YYYY")}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-end">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            openModal(category);
                          }}
                          className="text-gray-400 hover:text-brand-500"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={(e: React.MouseEvent) => handleDelete(category.id, e)}
                          className="text-gray-400 hover:text-error-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {editingCategory ? "Edit Category" : "Add Category"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter category name"
                required
                className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Icon URL (Optional)
              </label>
              <input
                type="text"
                value={formData.iconUrl}
                onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
                placeholder="https://..."
                className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05]"
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={closeModal} type="button">
                Cancel
              </Button>
              <Button type="submit" loading={createMutation.isPending || updateMutation.isPending}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ShopCategoriesManagement;

