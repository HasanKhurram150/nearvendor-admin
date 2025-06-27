import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { proPackageColumns } from "./columns";
import GenericButton from "../atoms/generic-button/generic-button";
import { EditIcon } from "@/icons";
import { IPackages, IPrice } from "@/services/packages-api/packages-api.types";
import Loading from "../atoms/loading/loading";

const SubscriptionTabs = ({
  packages,
  handleOpenEditPricingModal,
  isLoading,
}: {
  packages: IPackages[];
  handleOpenEditPricingModal: (price: IPrice, id: string) => void;
  isLoading?: boolean;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const activePackage = packages[activeTab];

  console.log("asdfasfsa", activePackage);

  return (
    <div className="w-full">
      {/* Tab Switcher */}
      <div className="flex mb-6 space-x-4">
        {packages.map((pkg, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-full border ${
              index === activeTab
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300"
            } transition-all duration-200`}
          >
            {pkg?.data?.name}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="mb-4">
        {/* <h2 className="text-xl font-semibold">{activePackage.name}</h2> */}
        <p className="text-gray-600">{activePackage?.data?.description}</p>
      </div>
      <div className="grid overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[30rem] w-full pb-[1.5rem]">
        <div className="overflow-x-auto">
          {/* Prices Table */}
          <Table aria-label="Calendars management table" className="w-full">
            <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
              <TableRow>
                {proPackageColumns.map((col) => (
                  <TableCell
                    key={col.id}
                    isHeader
                    className={`py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white ${col.className} last:text-right first:pl-6 last:pr-6 ${activePackage?.data?.name === "Free Package" && col.header === "Action" ? "hidden" : ""}`}
                  >
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={proPackageColumns.length}
                    className="text-center py-8"
                  >
                    <div className="flex justify-center">
                      <Loading size="md" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : activePackage?.data?.prices?.length ? (
                activePackage.data.prices.map((price, index) => (
                  <TableRow key={price?.id || index} className="first: last:">
                    <TableCell className=" pl-6 pr-3 py-[1.25rem] text-[#201D1D] capitalize text-base dark:text-white/90 min-w-[10rem]">
                      {price?.interval}
                    </TableCell>
                    <TableCell className=" pl-6 pr-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {price?.amount === 0 ? "Free" : `$${price?.amount}`}
                    </TableCell>
                    {activePackage?.data?.name !== "Free Package" && (
                      <TableCell className=" pl-3 pr-6 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 text-right min-w-[10rem]">
                        <div className="flex justify-end gap-2">
                          <GenericButton
                            icon={<EditIcon />}
                            handleClick={() =>
                              handleOpenEditPricingModal(
                                price,
                                activePackage?.data?.id,
                              )
                            }
                          />
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={proPackageColumns?.length}
                    className="text-center py-8 text-gray-500"
                  >
                    No pricing data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTabs;
