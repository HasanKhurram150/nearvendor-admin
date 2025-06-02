"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { categoryColumns, categoryData } from "./columns";
import { useGetAllInventoryQuery } from "@/services";
import Loading from "../atoms/loading/loading";
import GenericButton from "../atoms/generic-button/generic-button";
import { EditIcon, PlusIcon, TrashBinIcon } from "@/icons";
import GenericSearchField from "../atoms/generic-search-field/generic-search-field";
import { GenericModal } from "../atoms/generic-modal";
import { AddCategoryModal } from "./add-category-modal";
import { EditCategoryModal } from "./edit-category-modal";

const CategoriesManagement: React.FC = () => {
  const [query, setQuery] = useState("");
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);

  const { data: inventory, isLoading } = useGetAllInventoryQuery({
    page: 1,
    limit: 10,
  });

  console.log("inventory", inventory);

  // Define the TypeScript interface for the table rows
  interface Inventory {
    id: number;
    inventoryName: string;
    inventoryCode: string;
    status: string;
    placement: string;
    advertiser: string;
    campaignName: string;
    targetGroup: string;
    adid: string;
    creative: string;
    exposure: string;
    totalClicks: string;
  }

  const handleOpenAddCategoryModal = () => {
    setAddCategoryModal(true);
  };
  const handleCloseAddCategoryModal = () => {
    setAddCategoryModal(false);
  };

  const handleOpenEditCategoryModal = () => {
    setEditCategoryModal(true);
  };
  const handleCloseEditCategoryModal = () => {
    setEditCategoryModal(false);
  };

  return (
    <div className="flex flex-col gap-[2.5rem] items-start w-full">
      <div className="flex justify-start flex-wrap gap-4 items-center w-full">
        <GenericSearchField
          value={query}
          onChange={setQuery}
          placeholder="Search by name"
        />
        <GenericButton
          icon={<PlusIcon />}
          btnText="Add New"
          bgColor="#1862D4"
          color="#fff"
          height="2.5rem"
          width="7.188rem"
          handleClick={handleOpenAddCategoryModal}
        />
      </div>
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] w-full">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
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

            {/* Table Body */}

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {isLoading ? (
                <TableRow>
                  <TableCell className="text-center py-8">
                    <div className="flex justify-center">
                      <Loading size="lg" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {categoryData.map((item, index) => (
                    <TableRow key={index} className="first: last:">
                      <TableCell className=" pl-6 pr-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                        {item?.categoryName}
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                        {item?.sourceId}
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                        <div className="bg-[#1862D417] text-base text-[#1862D4] h-[1.5rem] w-[6.563rem] rounded-xl text-center">
                          {item?.eventCount} events
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                        {item?.orderBy}
                      </TableCell>
                      <TableCell className=" pl-3 pr-6 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 text-right min-w-[12rem]">
                        <div className="flex justify-end gap-2">
                          <GenericButton
                            icon={<EditIcon />}
                            handleClick={handleOpenEditCategoryModal}
                          />
                          <GenericButton icon={<TrashBinIcon />} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <GenericModal
        isOpen={addCategoryModal}
        onClose={handleCloseAddCategoryModal}
      >
        <AddCategoryModal onClose={handleCloseAddCategoryModal} />
      </GenericModal>
      <GenericModal
        isOpen={editCategoryModal}
        onClose={handleCloseEditCategoryModal}
      >
        <EditCategoryModal onClose={handleCloseEditCategoryModal} />
      </GenericModal>
    </div>
  );
};

export default CategoriesManagement;
