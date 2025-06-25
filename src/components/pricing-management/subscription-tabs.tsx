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

type Price = {
  id: string;
  amount: number;
  currency: string;
  stripePriceId: string;
  interval: string;
  isActive: boolean;
};

type Package = {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  isActive: boolean;
  prices: Price[];
};

const packages: Package[] = [
  {
    id: "pro",
    name: "Pro Package",
    description: "Advanced features with no limitations",
    isDefault: false,
    isActive: true,
    prices: [
      {
        id: "yearly",
        amount: 708,
        currency: "usd",
        stripePriceId: "price_1RZVTJQLXO4wTUZTlMYxuxQr",
        interval: "year",
        isActive: true,
      },
      {
        id: "monthly",
        amount: 69,
        currency: "usd",
        stripePriceId: "price_1RZVTIQLXO4wTUZT5iFcir8g",
        interval: "month",
        isActive: true,
      },
    ],
  },
  {
    id: "free",
    name: "Free Package",
    description: "Basic features for getting started",
    isDefault: true,
    isActive: true,
    prices: [
      {
        id: "free-month",
        amount: 0,
        currency: "usd",
        stripePriceId: "price_1RZVTIQLXO4wTUZTbqjhsHi5",
        interval: "month",
        isActive: true,
      },
    ],
  },
];

const SubscriptionTabs = ({
  handleOpenEditPricingModal,
}: {
  handleOpenEditPricingModal?: () => void;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const activePackage = packages[activeTab];

  return (
    <div className="w-full">
      {/* Tab Switcher */}
      <div className="flex mb-6 space-x-4">
        {packages.map((pkg, index) => (
          <button
            key={pkg.id}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-full border ${
              index === activeTab
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300"
            } transition-all duration-200`}
          >
            {pkg.name}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="mb-4">
        {/* <h2 className="text-xl font-semibold">{activePackage.name}</h2> */}
        <p className="text-gray-600">{activePackage.description}</p>
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
                    className={`py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white ${col.className} last:text-right first:pl-6 last:pr-6 ${activePackage.name === "Free Package" && col.header === "Action" ? "hidden" : ""}`}
                  >
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {activePackage.prices.map((price) => (
                <TableRow key={price.id} className="first: last:">
                  <TableCell className=" pl-6 pr-3 py-[1.25rem] text-[#201D1D] capitalize text-base dark:text-white/90 min-w-[10rem]">
                    {price.interval}
                  </TableCell>
                  <TableCell className=" pl-6 pr-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                    {" "}
                    {price.amount === 0 ? "Free" : `$${price.amount}`}
                  </TableCell>
                  {/* <TableCell className=" pl-6 pr-3 py-[1.25rem] text-[#201D1D] uppercase text-base dark:text-white/90 min-w-[10rem]">
                    {price.currency}
                  </TableCell>
                  <TableCell className=" pl-6 pr-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                    {price.stripePriceId}
                  </TableCell> */}
                  {activePackage.name !== "Free Package" && (
                    <TableCell className=" pl-3 pr-6 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 text-right min-w-[10rem]">
                      <div className="flex justify-end gap-2">
                        <GenericButton
                          icon={<EditIcon />}
                          handleClick={handleOpenEditPricingModal}
                        />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTabs;
