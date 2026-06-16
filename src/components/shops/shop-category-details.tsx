"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Trash2, Plus, Edit2, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { shopCategoriesAPI } from "@/services/shops/shop-categories-api";
import { itemCategoriesAPI } from "@/services/shops/item-categories-api";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Loading from "../atoms/loading/loading";
import toast from "react-hot-toast";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import dayjs from "dayjs";
import Badge from "../ui/badge/Badge";

interface Props {
  categoryId: string;
}

const ShopCategoryDetails: React.FC<Props> = ({ categoryId }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isItemCategoryModalOpen, setIsItemCategoryModalOpen] = useState(false);
  const [selectedItemCategories, setSelectedItemCategories] = useState<
    string[]
  >([]);
  const [editingItemCategoryId, setEditingItemCategoryId] = useState<
    string | null
  >(null);
  const [editingItemCategoryName, setEditingItemCategoryName] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItemCategoryName, setNewItemCategoryName] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["shops-by-category", categoryId],
    queryFn: () => shopCategoriesAPI.getShopsByCategory(categoryId),
  });

  const { data: allItemCategoriesData } = useQuery({
    queryKey: ["item-categories"],
    queryFn: () => itemCategoriesAPI.getAllItemCategories(),
  });

  const shopCategory = data?.data?.shopCategory;
  const shops = data?.data?.shops || [];
  const allItemCategories = allItemCategoriesData?.data || [];

  // Wait, shopCategory from getShopsByCategory doesn't have itemCategories populated fully in the response example 5.
  // Let me fetch the single shop category if needed, or get from getAllShopCategories
  const { data: allShopCategoriesData } = useQuery({
    queryKey: ["shop-categories"],
    queryFn: () => shopCategoriesAPI.getAllShopCategories(),
  });

  const fullCategoryData = allShopCategoriesData?.data?.find(
    (c) => c.id === categoryId,
  );
  const assignedItemCategories = fullCategoryData?.itemCategories || [];

  const assignMutation = useMutation({
    mutationFn: (categoryIds: string[]) =>
      shopCategoriesAPI.assignItemCategories(categoryId, { categoryIds }),
    onSuccess: () => {
      toast.success("Item categories assigned successfully");
      queryClient.invalidateQueries({ queryKey: ["shop-categories"] });
      closeItemCategoryModal();
    },
    onError: () => toast.error("Failed to assign item categories"),
  });

  const removeMutation = useMutation({
    mutationFn: (itemCategoryId: string) =>
      shopCategoriesAPI.removeItemCategory(categoryId, itemCategoryId),
    onSuccess: () => {
      toast.success("Item category removed successfully");
      queryClient.invalidateQueries({ queryKey: ["shop-categories"] });
    },
    onError: () => toast.error("Failed to remove item category"),
  });

  const createItemCategoryMutation = useMutation({
    mutationFn: (data: any) => itemCategoriesAPI.createItemCategory(data),
    onSuccess: () => {
      toast.success("Item category created");
      queryClient.invalidateQueries({ queryKey: ["item-categories"] });
      setIsAddingNew(false);
      setNewItemCategoryName("");
    },
    onError: () => toast.error("Failed to create item category"),
  });

  const updateItemCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      itemCategoriesAPI.updateItemCategory(id, data),
    onSuccess: () => {
      toast.success("Item category updated");
      queryClient.invalidateQueries({ queryKey: ["item-categories"] });
      setEditingItemCategoryId(null);
    },
    onError: () => toast.error("Failed to update item category"),
  });

  const deleteItemCategoryMutation = useMutation({
    mutationFn: (id: string) => itemCategoriesAPI.deleteItemCategory(id),
    onSuccess: () => {
      toast.success("Item category deleted");
      queryClient.invalidateQueries({ queryKey: ["item-categories"] });
      queryClient.invalidateQueries({ queryKey: ["shop-categories"] }); // In case it was assigned
    },
    onError: () => toast.error("Failed to delete item category"),
  });

  const openItemCategoryModal = () => {
    setSelectedItemCategories(assignedItemCategories.map((ic) => ic.id));
    setIsItemCategoryModalOpen(true);
  };

  const closeItemCategoryModal = () => {
    setIsItemCategoryModalOpen(false);
    setSelectedItemCategories([]);
    setEditingItemCategoryId(null);
    setIsAddingNew(false);
    setNewItemCategoryName("");
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    assignMutation.mutate(selectedItemCategories);
  };

  const toggleItemCategorySelection = (id: string) => {
    setSelectedItemCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading size="lg" className="border-brand-500" />
      </div>
    );
  }

  if (!shopCategory) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-500">
        Category not found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/shops")}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] hover:bg-white/[0.06] text-gray-400 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <PageBreadcrumb pageTitle={shopCategory.name || "Category Details"} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Category Info & Item Categories */}
        <div className="flex flex-col gap-6 xl:col-span-1">
          <div className="dashboard-card p-6 rounded-2xl bg-[#11192E]">
            <h3 className="text-lg font-semibold text-white mb-4">
              Category Info
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-sm text-gray-500">Name</span>
                <p className="text-base text-white">{shopCategory.name}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Created At</span>
                <p className="text-base text-white">
                  {dayjs(shopCategory.createdAt).format("DD MMM, YYYY")}
                </p>
              </div>
            </div>
          </div>

          <div className="dashboard-card p-6 rounded-2xl bg-[#11192E]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Item Categories
              </h3>
              <Button
                size="sm"
                onClick={openItemCategoryModal}
                variant="outline"
                startIcon={<Plus size={14} />}
              >
                Manage
              </Button>
            </div>

            {assignedItemCategories.length === 0 ? (
              <p className="text-sm text-gray-500">
                No item categories assigned.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {assignedItemCategories.map((ic: any) => (
                  <div
                    key={ic.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                  >
                    <span className="text-sm text-white">
                      {ic.categoryName}
                    </span>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to remove this item category?",
                          )
                        ) {
                          removeMutation.mutate(ic.id);
                        }
                      }}
                      className="text-gray-400 hover:text-error-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Shops Table */}
        <div className="xl:col-span-2 dashboard-card rounded-2xl bg-[#11192E] overflow-hidden min-h-[500px]">
          <div className="px-6 py-5 border-b border-[#1D1C1C]">
            <h3 className="text-lg font-semibold text-white">
              Shops ({shops.length})
            </h3>
          </div>

          <div className="max-w-full overflow-x-auto">
            <Table hoverable>
              <TableHeader className="border-b border-[#1D1C1C] bg-white/[0.02] px-[1rem]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white"
                  >
                    Shop
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white"
                  >
                    Location
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white"
                  >
                    Joined
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-[#1D1C1C]">
                {shops.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-10 text-gray-500"
                    >
                      No shops found in this category
                    </TableCell>
                  </TableRow>
                ) : (
                  shops.map((shop) => (
                    <TableRow key={shop.id}>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {shop.shopLogoUrl ? (
                            <img
                              src={shop.shopLogoUrl}
                              alt={shop.shopName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-500 font-bold">
                              {shop.shopName.charAt(0)}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">
                              {shop.shopName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {shop.whatsappNumber}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-400">
                        {shop.shopAddress}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge
                          color={shop.isActive ? "success" : "error"}
                          variant="light"
                          size="sm"
                        >
                          {shop.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-400">
                        {dayjs(shop.createdAt).format("DD MMM, YYYY")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isItemCategoryModalOpen}
        onClose={closeItemCategoryModal}
        // showCloseButton={false}
      >
        <div className="p-6 w-[500px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Manage Item Categories
            </h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAddingNew(true)}
              startIcon={<Plus size={14} />}
            >
              Add New
            </Button>
          </div>

          {isAddingNew && (
            <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-white/[0.02] border border-brand-500/50">
              <input
                type="text"
                autoFocus
                placeholder="New Category Name"
                value={newItemCategoryName}
                onChange={(e) => setNewItemCategoryName(e.target.value)}
                className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-sm text-white outline-none focus:border-brand-500/40"
              />
              <button
                type="button"
                onClick={() => {
                  if (newItemCategoryName.trim()) {
                    createItemCategoryMutation.mutate({
                      categoryName: newItemCategoryName.trim(),
                    });
                  }
                }}
                className="p-1.5 text-success-500 hover:bg-white/[0.05] rounded-lg"
              >
                <Check size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingNew(false);
                  setNewItemCategoryName("");
                }}
                className="p-1.5 text-gray-400 hover:text-error-500 hover:bg-white/[0.05] rounded-lg"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <form onSubmit={handleAssignSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {allItemCategories.length === 0 && !isAddingNew ? (
                <p className="text-sm text-gray-500">
                  No item categories available.
                </p>
              ) : (
                allItemCategories.map((ic: any) => (
                  <div
                    key={ic.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-colors group"
                  >
                    {editingItemCategoryId === ic.id ? (
                      <div className="flex flex-1 items-center gap-2">
                        <input
                          type="text"
                          autoFocus
                          value={editingItemCategoryName}
                          onChange={(e) =>
                            setEditingItemCategoryName(e.target.value)
                          }
                          className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-sm text-white outline-none focus:border-brand-500/40"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              editingItemCategoryName.trim() &&
                              editingItemCategoryName !== ic.categoryName
                            ) {
                              updateItemCategoryMutation.mutate({
                                id: ic.id,
                                data: {
                                  categoryName: editingItemCategoryName.trim(),
                                },
                              });
                            } else {
                              setEditingItemCategoryId(null);
                            }
                          }}
                          className="p-1.5 text-success-500 hover:bg-white/[0.05] rounded-lg"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingItemCategoryId(null)}
                          className="p-1.5 text-gray-400 hover:text-error-500 hover:bg-white/[0.05] rounded-lg"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <label className="flex items-center gap-3 cursor-pointer flex-1 py-1">
                          <input
                            type="checkbox"
                            checked={selectedItemCategories.includes(ic.id)}
                            onChange={() => toggleItemCategorySelection(ic.id)}
                            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-brand-500 focus:ring-brand-500 focus:ring-offset-gray-900"
                          />
                          <span className="text-sm text-white">
                            {ic.categoryName}
                          </span>
                        </label>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setEditingItemCategoryId(ic.id);
                              setEditingItemCategoryName(ic.categoryName);
                            }}
                            className="p-1.5 text-gray-400 hover:text-brand-500 rounded-lg transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              if (
                                confirm(
                                  "Are you sure you want to delete this item category completely?",
                                )
                              ) {
                                deleteItemCategoryMutation.mutate(ic.id);
                              }
                            }}
                            className="p-1.5 text-gray-400 hover:text-error-500 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/[0.1]">
              <Button
                variant="outline"
                onClick={closeItemCategoryModal}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit" loading={assignMutation.isPending}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ShopCategoryDetails;
