"use client";
import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";


const PlacementList: React.FC = () => {

  // Define the TypeScript interface for the table rows
interface Placements {
  id: number;
  placementCode: string; 
  placementName: string; 
  form: string; 
  size: string; 
  material: string; 
  inventory: string;
  adid: string;
  sbt: string;
}
 
// Define the table data using the interface
const tableData: Placements[] = [
  {
    id: 1,
    placementCode: "H1",
    placementName: "홈중단배너",
    form: "Banner",
    size: "320*100 테두리",
    material:'Video',
    inventory: '0',
    adid: '5',
    sbt: '5',
  },
  {
    id: 2,
    placementCode: "H1",
    placementName: "홈중단배너",
    form: "Banner",
    size: "320*100 테두리",
    material:'Image',
    inventory: '0',
    adid: '5',
    sbt: '5',
  },
  {
    id: 3,
    placementCode: "H1",
    placementName: "홈중단배너",
    form: "Banner",
    size: "320*100 테두리",
    material:'Video',
    inventory: '0',
    adid: '5',
    sbt: '5',
  },
  {
    id: 4,
    placementCode: "H1",
    placementName: "홈중단배너",
    form: "Banner",
    size: "320*100 테두리",
    material:'Video',
    inventory: '0',
    adid: '5',
    sbt: '5',
  },
  {
    id: 5,
    placementCode: "H1",
    placementName: "홈중단배너",
    form: "Banner",
    size: "320*100 테두리",
    material:'Video',
    inventory: '0',
    adid: '5',
    sbt: '5',
  },
];

  return (


<div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[15rem]"
              >
                Placement Code
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
              >
               Placement Name
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[8.125rem]"
              >
               Form
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[15rem]"
              >
               Size
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
              >
               Material
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
              >
               Inventory
              </TableCell>
             
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
              >
               ADID
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white  min-w-[8.125rem]"
              >
               SBT
              </TableCell>
             
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((user) => (
              <TableRow key={user.id} className="">
            <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                        {user.placementCode}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                  {user.placementName}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                {user.form}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                {user.size}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                  {user.material}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                {user.inventory}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                  {user.adid}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                 {user.sbt}
                </TableCell>
             
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
      
  );
};


export default PlacementList;
