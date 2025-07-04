"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useInventoryColumns } from "./columns";
import { useGetAllInventoryQuery } from "@/services";
import Loading from "../atoms/loading/loading";
import { useLanguage } from "../common/LanguageContext";
import GenericButton from "../atoms/generic-button/generic-button";
import { EditIcon } from "@/icons";
import PageBreadcrumb from "../common/PageBreadCrumb";
import { useRouter } from "next/navigation";
// import GenericPagination from "../atoms/generic-pagination/generic-pagination";

const InventoryList: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const columns = useInventoryColumns();
  const { data: inventory, isLoading } = useGetAllInventoryQuery({
    page: 1,
    limit: 200,
  });

  const handleEditInventory = (id: string) => {
    router.push(`/edit-inventory/${id}`);
  };

  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 5;

  console.log("inventory", inventory);

  return (
    <>
      <PageBreadcrumb
        pageTitle={t("inventoryList")}
        counter={true}
        counterText={t("totalInventory")}
        counterValue={0}
        btnInventory={true}
      />

      <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] pb-[1.5rem]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header - Always visible */}
            <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    isHeader
                    className={`py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white ${col.className}`}
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
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-8"
                  >
                    <div className="flex justify-center">
                      <Loading size="lg" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : inventory?.data?.length ? (
                inventory.data.map((item) => (
                  <TableRow key={item?.id} className="">
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {item?.inventoryName}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {item?.uniqueId}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                      {item?.status}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {item?.placement?.placementName}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {item?.campaign?.advertiser?.nickName}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {item?.campaign?.name}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8rem]">
                      {item?.exposureCounter}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8rem]">
                      {item?.totalClicks}
                    </TableCell>
                    <TableCell className="pl-3 pr-6 py-5 text-left min-w-[10rem]">
                      <div className="flex justify-start gap-2">
                        <GenericButton
                          icon={<EditIcon />}
                          aria-label={`Edit ${item?.inventoryName}`}
                          handleClick={() => {
                            handleEditInventory(item.id);
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-10 text-gray-500 dark:text-gray-400"
                  >
                    {t("noInventoryFound")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* <GenericPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              /> */}
      </div>
    </>
  );
};

export default InventoryList;
