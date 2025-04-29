"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetAllPlacementsQuery } from "@/services/placement-api";
import Loading from "../atoms/loading/loading";
import PageBreadcrumb from "../common/PageBreadCrumb";

const PlacementList: React.FC = () => {
  const { data, isLoading } = useGetAllPlacementsQuery();

  console.log("placements", data);

  const columns = [
    { id: "1", header: "Placement Code", className: "min-w-[15rem]" },
    { id: "2", header: "Placement Name", className: "min-w-[12rem]" },
    { id: "3", header: "Form", className: "min-w-[8.125rem]" },
    { id: "4", header: "Size", className: "min-w-[15rem]" },
    { id: "5", header: "Material", className: "min-w-[12rem]" },
    { id: "6", header: "Inventory", className: "min-w-[10rem]" },
  ];

  return (
    <>
      <PageBreadcrumb
        pageTitle="Placement List"
        counter={true}
        counterText="Total Placement"
        counterValue={data?.length}
      />
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col?.id}
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
                  <TableCell className="text-center py-8">
                    <div className="flex justify-center">
                      <Loading size="lg" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {data?.map(
                    ({
                      id,
                      placementCode,
                      placementName,
                      form,
                      width,
                      height,
                      support,
                    }) => (
                      <TableRow key={id} className="">
                        <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                          {/* {user.placementCode} */}
                          {placementCode}
                        </TableCell>
                        <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                          {/* {user.placementName} */}
                          {placementName}
                        </TableCell>
                        <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                          {/* {user.form} */}
                          {form}
                        </TableCell>
                        <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                          {width}* {height}
                        </TableCell>
                        <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                          {/* {user.material} */}
                          {support}
                        </TableCell>
                        <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                          {/* {user.inventory} */}0
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default PlacementList;
